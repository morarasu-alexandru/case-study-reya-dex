import type { Position } from "@/types/reya-api";
import { getSymbolForMarket } from "./markets";

export const TEST_WALLET_ADDRESS = "0x6c51275fd01d5dbd2da194e92f920f8598306df2";

export const MOCK_POSITIONS: Position[] = [
  { exchangeId: 1, symbol: getSymbolForMarket("ETH"), accountId: 1, qty: "-1.30", side: "S", avgEntryPrice: "3200.50", avgEntryFundingValue: "0", lastTradeSequenceNumber: 1 },
  { exchangeId: 1, symbol: getSymbolForMarket("BTC"), accountId: 1, qty: "0.50", side: "B", avgEntryPrice: "95000.00", avgEntryFundingValue: "0", lastTradeSequenceNumber: 2 },
  { exchangeId: 1, symbol: getSymbolForMarket("SOL"), accountId: 1, qty: "135.30", side: "B", avgEntryPrice: "180.25", avgEntryFundingValue: "0", lastTradeSequenceNumber: 3 },
  { exchangeId: 1, symbol: getSymbolForMarket("EIGEN"), accountId: 1, qty: "-500.00", side: "S", avgEntryPrice: "4.50", avgEntryFundingValue: "0", lastTradeSequenceNumber: 4 },
  { exchangeId: 1, symbol: getSymbolForMarket("PENGU"), accountId: 1, qty: "100000.00", side: "B", avgEntryPrice: "0.035", avgEntryFundingValue: "0", lastTradeSequenceNumber: 5 },
  { exchangeId: 1, symbol: getSymbolForMarket("MEGA"), accountId: 1, qty: "5000.00", side: "B", avgEntryPrice: "0.012", avgEntryFundingValue: "0", lastTradeSequenceNumber: 6 },
  { exchangeId: 1, symbol: getSymbolForMarket("LINK"), accountId: 1, qty: "50.00", side: "B", avgEntryPrice: "22.80", avgEntryFundingValue: "0", lastTradeSequenceNumber: 7 },
];
