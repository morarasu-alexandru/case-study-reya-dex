const MARKET_TO_SYMBOL: Record<string, string> = {
  ETH: "ETHRUSDPERP",
  BTC: "BTCRUSDPERP",
  SOL: "SOLRUSDPERP",
  EIGEN: "EIGENRUSDPERP",
  PENGU: "PENGURUSDPERP",
  MEGA: "MEGARUSDPERP",
  LINK: "LINKRUSDPERP",
  ARB: "ARBRUSDPERP",
  OP: "OPRUSDPERP",
  AVAX: "AVAXRUSDPERP",
};

export function getSymbolForMarket(market: string): string {
  return MARKET_TO_SYMBOL[market] || `${market}RUSDPERP`;
}

const SYMBOL_TO_MARKET: Record<string, string> = Object.fromEntries(
  Object.entries(MARKET_TO_SYMBOL).map(([market, symbol]) => [symbol, market])
);

export function getMarketFromSymbol(symbol: string): string {
  return SYMBOL_TO_MARKET[symbol] || symbol.replace(/RUSDPERP$/, "");
}
