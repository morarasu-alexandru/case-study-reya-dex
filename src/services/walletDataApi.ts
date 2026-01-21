import { MOCK_POSITIONS } from "@/constants/mockData";
import type { Account, Position } from "@/types/reya-api";
import { reyaApi } from "./index";

export async function apiGetAccounts(walletAddress: string): Promise<Account[]> {
  const res = await reyaApi.get<Account[]>(`/wallet/${walletAddress}/accounts`);
  return res.data;
}

export async function apiGetPositions(walletAddress: string): Promise<Position[]> {
  const res = await reyaApi.get<Position[]>(`/wallet/${walletAddress}/positions`);
  if (res.data.length === 0) {
    return MOCK_POSITIONS;
  }
  return res.data;
}
