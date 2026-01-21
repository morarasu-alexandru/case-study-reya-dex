"use client";

import { useContext, useEffect } from "react";
import { WsDexContext } from "@/contexts/WsDexContext";
import { apiGetMarketsSummary } from "@/services/marketDataApi";
import { useActions } from "@/store/store.utils";
import {
  type MarketPrice,
  useHasFetchedFromApi,
  usePositions,
  useWalletAddress,
  useWalletError,
  useWalletLoading,
  useWalletStore,
} from "@/store/walletStore";
import { PositionRow } from "./positionRow";

function TableState({ message }: { message: string }) {
  return <div className="flex items-center justify-center py-12 text-reya-gray text-sm">{message}</div>;
}

export function PositionsTable() {
  const positions = usePositions();
  const walletAddress = useWalletAddress();
  const loading = useWalletLoading();
  const error = useWalletError();
  const hasFetchedFromApi = useHasFetchedFromApi();
  const { updatePrices, setHasFetchedFromApi } = useActions(useWalletStore);
  const wsDex = useContext(WsDexContext);

  useEffect(() => {
    if (hasFetchedFromApi) return;

    apiGetMarketsSummary()
      .then((markets) => {
        const prices: Record<string, MarketPrice> = {};
        for (const market of markets) {
          prices[market.symbol] = {
            oraclePrice: market.throttledOraclePrice,
            poolPrice: market.throttledPoolPrice,
            updatedAt: market.updatedAt,
            direction: "neutral",
          };
        }
        updatePrices(prices);
        setHasFetchedFromApi(true);
      })
      .catch(() => {});
  }, [hasFetchedFromApi, updatePrices, setHasFetchedFromApi]);

  useEffect(() => {
    if (positions.length > 0) {
      wsDex?.subscribeToChannel("prices");
    } else {
      wsDex?.unsubscribeFromChannel("prices");
    }
    return () => {
      wsDex?.unsubscribeFromChannel("prices");
    };
  }, [positions.length, wsDex]);

  if (!walletAddress) return <TableState message="Enter a wallet address to view positions" />;
  if (loading) return <TableState message="Loading positions..." />;
  if (error) return <TableState message={error} />;
  if (!positions.length) return <TableState message="No positions found" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-reya-gray text-left text-xs">
            <th className="py-1.5 font-medium">Market</th>
            <th className="py-1.5 font-medium">Size</th>
            <th className="py-1.5 font-medium">Position Value</th>
            <th className="py-1.5 font-medium text-right"><span className="inline-block text-left min-w-[6rem]">Mark Price</span></th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position, i) => (
            <PositionRow key={`${position.symbol}-${i}`} position={position} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
