import type { MarketSummary } from "@/types/reya-api";
import { reyaApi } from "./index";

export async function apiGetMarketsSummary(): Promise<MarketSummary[]> {
  const res = await reyaApi.get<MarketSummary[]>("/markets/summary");
  return res.data;
}
