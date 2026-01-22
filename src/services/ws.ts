import { ALL_POSITIONS_CHANNEL, ALL_PRICES_CHANNEL, RECONNECT_DELAY, REYA_WS_URL } from "@/constants/ws";
import type { MarketPrice, PriceDirection } from "@/store/walletStore";
import { useWalletStore } from "@/store/walletStore";
import type { WebSocketMessage } from "@/types/websocket";
import { useActions } from "@/store/store.utils";
import type { Position } from "@/types/reya-api";

const FLUSH_INTERVAL_MS = 1500;

interface BufferedPrice {
  oraclePrice: string;
  poolPrice: string;
  updatedAt: number;
}

let ws: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;
let flushInterval: NodeJS.Timeout | null = null;
const pendingSubscriptions = new Set<string>();
const priceBuffer: Record<string, BufferedPrice> = {};

function flushPriceBuffer(): void {
  const symbols = Object.keys(priceBuffer);
  if (symbols.length === 0) return;

  const state = useWalletStore.getState();
  const currentPrices = state.data.prices;
  const { updatePrices } = state.actions;
  const changedPrices: Record<string, MarketPrice> = {};

  for (const symbol of symbols) {
    const buffered = priceBuffer[symbol];
    const current = currentPrices[symbol];
    const newVal = Number.parseFloat(buffered.oraclePrice);

    if (current) {
      const oldVal = Number.parseFloat(current.oraclePrice);
      if (oldVal === newVal) continue;
      if (current.updatedAt >= buffered.updatedAt) continue;
    }

    let direction: PriceDirection = "neutral";
    if (current) {
      const oldVal = Number.parseFloat(current.oraclePrice);
      if (newVal > oldVal) {
        direction = "up";
      } else if (newVal < oldVal) {
        direction = "down";
      }
    }

    changedPrices[symbol] = {
      oraclePrice: buffered.oraclePrice,
      poolPrice: buffered.poolPrice,
      updatedAt: buffered.updatedAt,
      direction,
    };
  }

  for (const symbol of symbols) {
    delete priceBuffer[symbol];
  }

  if (Object.keys(changedPrices).length > 0) {
    updatePrices(changedPrices);
  }
}

export function connectDex(): void {
  if (ws) return;
  try {
    ws = new WebSocket(REYA_WS_URL);
    ws.onopen = () => {
      const { setConnected } = useWalletStore.getState().actions;
      setConnected(true);
      for (const channel of pendingSubscriptions) {
        ws?.send(JSON.stringify({ type: "subscribe", channel }));
      }
      pendingSubscriptions.clear();
      if (!flushInterval) {
        flushInterval = setInterval(flushPriceBuffer, FLUSH_INTERVAL_MS);
      }
    };
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;
        if (message?.type === "ping") {
          ws?.send(JSON.stringify({ type: "pong", timestamp: message.timestamp }));
          return;
        }
        const setPositions = useWalletStore.getState().actions.setPositions;
        if (message.channel?.startsWith("/v2/wallet")) {

          console.log('message', message);

          console.log('message.data', message.data);
          if (message.data) {
            // @ts-expect-error
            setPositions(message.data);
          }
          return
        }


        if (message?.type === "channel_data" && Array.isArray(message.data)) {
          for (const priceData of message.data) {
            const { symbol, oraclePrice, poolPrice, updatedAt } = priceData;
            priceBuffer[symbol] = {
              oraclePrice,
              poolPrice: poolPrice ?? oraclePrice,
              updatedAt,
            };
          }
        }
      } catch {}
    };
    ws.onclose = () => {
      const { setConnected } = useWalletStore.getState().actions;
      setConnected(false);
      reconnectTimeout = setTimeout(() => connectDex(), RECONNECT_DELAY);
    };
  } catch {}
}

export function disconnectDex(): void {
  if (flushInterval) {
    clearInterval(flushInterval);
    flushInterval = null;
  }
  for (const symbol of Object.keys(priceBuffer)) {
    delete priceBuffer[symbol];
  }
  if (reconnectTimeout) clearTimeout(reconnectTimeout);
  if (ws) {
    ws.close();
    ws = null;
  }
  const { setConnected } = useWalletStore.getState().actions;
  setConnected(false);
}

export function isWsConnected(): boolean {
  return ws !== null && ws.readyState === WebSocket.OPEN;
}

export function subscribeToPricesChannel(): void {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "subscribe", channel: ALL_PRICES_CHANNEL }));
  } else {
    pendingSubscriptions.add(ALL_PRICES_CHANNEL);
  }
}

export function subscribeToPositionsChannel(address: string): void {
  console.log('called here');
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "subscribe", channel: `${ALL_POSITIONS_CHANNEL}/${address}/positions` }));
  } else {
    pendingSubscriptions.add(ALL_POSITIONS_CHANNEL);
  }
}


export function unsubscribeFromPricesChannel(address?:string): void {
  pendingSubscriptions.delete(ALL_PRICES_CHANNEL);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "unsubscribe", channel: `${ALL_POSITIONS_CHANNEL}/${address}/positions` }));
  }
}

