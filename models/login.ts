import { APIResponse } from "./response.ts";

export interface LoginResponse extends APIResponse {
	meta?: {
		session_id: string;
	};
}
