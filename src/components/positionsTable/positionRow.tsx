"use client";

import { memo } from "react";
import { getMarketFromSymbol } from "@/constants/markets";
import { type PriceDirection, usePrice } from "@/store/walletStore";
import type { Position } from "@/types/reya-api";

function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatUSD(value: number): string {
  return `$${formatNumber(value)}`;
}

function getDirectionColor(direction: PriceDirection): string {
  if (direction === "up") return "text-reya-screamin-green";
  if (direction === "down") return "text-reya-brink-pink";
  return "text-reya-athens-gray";
}

export const PositionRow = memo(function PositionRow({ position }: { position: Position }) {
  const priceData = usePrice(position.symbol);
  const market = getMarketFromSymbol(position.symbol);
  const markPrice = priceData ? Number.parseFloat(priceData.oraclePrice) : 0;
  const size = Math.abs(Number.parseFloat(position.qty));
  const positionValue = size * markPrice;
  const direction = priceData?.direction || "neutral";
  const colorClass = getDirectionColor(direction);

  return (
    <tr>
      <td className={`py-[0.625rem] text-xs tracking-wide ${colorClass} transition-colors duration-300`}>{market}</td>
      <td className="py-[0.625rem] text-xs text-reya-athens-gray">
        <span className="tabular-nums">{formatNumber(size)}</span>
      </td>
      <td className="py-[0.625rem] text-xs text-reya-athens-gray">
        <span className="tabular-nums">{markPrice > 0 ? formatUSD(positionValue) : "-"}</span>
      </td>
      <td className="py-[0.625rem] text-xs text-reya-athens-gray text-right">
        <span className="inline-block text-left tabular-nums min-w-[6rem]">{markPrice > 0 ? formatNumber(markPrice, 2) : "-"}</span>
      </td>
    </tr>
  );
});
