export interface PriceData {
	symbol: string;
	oraclePrice: string;
	poolPrice: string;
	updatedAt: number;
}

export interface WebSocketMessage {
	type: "subscribed" | "channel_data" | "error" | "ping";
	timestamp?: number;
	channel?: string;
	data?: PriceData[];
	message?: string;
}
