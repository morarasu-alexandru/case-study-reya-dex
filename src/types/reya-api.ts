export interface Account {
	accountId: number;
	name: string;
	type: string;
}

export interface Position {
	exchangeId: number;
	symbol: string;
	accountId: number;
	qty: string;
	side: "B" | "S";
	avgEntryPrice: string;
	avgEntryFundingValue: string;
	lastTradeSequenceNumber: number;
}

export interface ApiError {
	error: string;
	message: string;
}

// Market Data Types
export interface MarketSummary {
	symbol: string;
	updatedAt: number;
	longOiQty: string;
	shortOiQty: string;
	oiQty: string;
	fundingRate: string;
	volume24h: string;
	pxChange24h: string;
	throttledOraclePrice: string;
	throttledPoolPrice: string;
}
