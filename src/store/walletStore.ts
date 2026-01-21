import type { Position } from "@/types/reya-api";
import { createStore, type Store, type StoreState } from "./store.utils";

export type PriceDirection = "up" | "down" | "neutral";

export interface MarketPrice {
  oraclePrice: string;
  poolPrice: string;
  updatedAt: number;
  direction: PriceDirection;
}

export interface WalletData {
  walletAddress: string;
  positions: Position[];
  loading: boolean;
  error: string | null;
  prices: Record<string, MarketPrice>;
  isConnected: boolean;
  hasFetchedFromApi: boolean;
}

export interface WalletActions {
  setWalletAddress: (address: string) => void;
  setPositions: (positions: Position[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearWallet: () => void;
  updatePrices: (prices: Record<string, MarketPrice>) => void;
  setConnected: (connected: boolean) => void;
  setHasFetchedFromApi: (fetched: boolean) => void;
}

export type WalletState = StoreState<WalletData, WalletActions>;
export type WalletStore = Store<WalletData, WalletActions>;

export const useWalletStore: WalletStore = createStore<WalletData, WalletActions>(
  "wallet",
  (_setState, _getState, updateData): WalletState => ({
    data: {
      walletAddress: "",
      positions: [],
      loading: false,
      error: null,
      prices: {},
      isConnected: false,
      hasFetchedFromApi: false,
    },
    actions: {
      setWalletAddress: (address) => updateData({ walletAddress: address, error: null }, "setWalletAddress"),
      setPositions: (positions) => updateData({ positions, loading: false }, "setPositions"),
      setLoading: (loading) => updateData({ loading }, "setLoading"),
      setError: (error) => updateData({ error, loading: false }, "setError"),
      clearWallet: () => updateData({ walletAddress: "", positions: [], error: null }, "clearWallet"),
      updatePrices: (prices: Record<string, MarketPrice>) => {
        updateData(
          (data) => ({
            prices: { ...data.prices, ...prices },
          }),
          "updatePrices",
        );
      },
      setConnected: (connected: boolean) => {
        updateData({ isConnected: connected }, "setConnected");
      },
      setHasFetchedFromApi: (fetched: boolean) => {
        updateData({ hasFetchedFromApi: fetched }, "setHasFetchedFromApi");
      },
    },
  }),
);

const selectPositions = (state: WalletState): Position[] => state.data.positions;
const selectWalletAddress = (state: WalletState): string => state.data.walletAddress;
const selectLoading = (state: WalletState): boolean => state.data.loading;
const selectError = (state: WalletState): string | null => state.data.error;
const selectPrices = (state: WalletState): Record<string, MarketPrice> => state.data.prices;
const selectHasFetchedFromApi = (state: WalletState): boolean => state.data.hasFetchedFromApi;

export const usePositions = (): Position[] => useWalletStore(selectPositions);
export const useWalletAddress = (): string => useWalletStore(selectWalletAddress);
export const useWalletLoading = (): boolean => useWalletStore(selectLoading);
export const useWalletError = (): string | null => useWalletStore(selectError);
export const usePrices = (): Record<string, MarketPrice> => useWalletStore(selectPrices);
export const useHasFetchedFromApi = (): boolean => useWalletStore(selectHasFetchedFromApi);
export const usePrice = (symbol: string): MarketPrice | undefined =>
  useWalletStore((state) => state.data.prices[symbol]);
