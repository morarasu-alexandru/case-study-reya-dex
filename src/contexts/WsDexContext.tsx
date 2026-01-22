"use client";

import { createContext, type ReactNode, useEffect, useCallback, useRef } from "react";
import {
  connectDex,
  disconnectDex, subscribeToPositionsChannel,
  subscribeToPricesChannel,
  unsubscribeFromPricesChannel,
} from "@/services/ws";

type Channel = "prices" | "positions";

interface WsDexContextValue {
  subscribeToChannel: (channel: Channel, address?: string) => void;
  unsubscribeFromChannel: (channel: Channel, address?: string) => void;
}

export const WsDexContext = createContext<WsDexContextValue | null>(null);

export function WsDexProvider({ children }: { children: ReactNode }) {
  const subscribedChannels = useRef<Set<Channel>>(new Set());

  useEffect(() => {
    connectDex();
    return () => {
      disconnectDex();
      subscribedChannels.current.clear();
    };
  }, []);

  const subscribeToChannel = useCallback((channel: Channel, address?: string) => {
    console.log('got here?', );
    console.log('channel', channel);
    console.log('addresss', address);
    if (subscribedChannels.current.has(channel)) return;
    switch (channel) {
      case "positions":
        address ? subscribeToPositionsChannel(address) : undefined;
      case "prices":
      default:
        subscribeToPricesChannel();


    }
    if (channel === "prices") {
    }
    subscribedChannels.current.add(channel);
  }, []);

  const unsubscribeFromChannel = useCallback((channel: Channel, address?: string) => {
    if (!subscribedChannels.current.has(channel)) return;



    if (channel === "prices") {
      unsubscribeFromPricesChannel();
    }
    if (channel === 'positions' && address) {
      unsubscribeFromPricesChannel(address);
    }
    subscribedChannels.current.delete(channel);
  }, []);

  return (
    <WsDexContext.Provider value={{ subscribeToChannel, unsubscribeFromChannel }}>
      {children}
    </WsDexContext.Provider>
  );
}
