"use client";

import { createContext, type ReactNode, useContext, useEffect, useCallback, useRef } from "react";
import {
  connectDex,
  disconnectDex,
  subscribeToPricesChannel,
  unsubscribeFromPricesChannel,
} from "@/services/ws";

type Channel = "prices";

interface WsDexContextValue {
  subscribeToChannel: (channel: Channel) => void;
  unsubscribeFromChannel: (channel: Channel) => void;
}

const WsDexContext = createContext<WsDexContextValue | null>(null);

export function useWsDex() {
  const context = useContext(WsDexContext);
  if (!context) {
    throw new Error("useWsDex must be used within WsDexProvider");
  }
  return context;
}

export function WsDexProvider({ children }: { children: ReactNode }) {
  const subscribedChannels = useRef<Set<Channel>>(new Set());

  useEffect(() => {
    connectDex();
    return () => {
      disconnectDex();
      subscribedChannels.current.clear();
    };
  }, []);

  const subscribeToChannel = useCallback((channel: Channel) => {
    if (subscribedChannels.current.has(channel)) return;
    if (channel === "prices") {
      subscribeToPricesChannel();
    }
    subscribedChannels.current.add(channel);
  }, []);

  const unsubscribeFromChannel = useCallback((channel: Channel) => {
    if (!subscribedChannels.current.has(channel)) return;
    if (channel === "prices") {
      unsubscribeFromPricesChannel();
    }
    subscribedChannels.current.delete(channel);
  }, []);

  return (
    <WsDexContext.Provider value={{ subscribeToChannel, unsubscribeFromChannel }}>
      {children}
    </WsDexContext.Provider>
  );
}
