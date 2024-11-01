export interface APIResponse {
	success: number;

	expired?: number;
	error?: string;

	data?: any;
	meta?: any;
}
