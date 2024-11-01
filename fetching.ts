import { APIResponse } from "./models/response.ts";

async function JSON(res: Response) {
	return await res.json();
}

export async function DoAs<T extends APIResponse>(
	endpoint: string,
	method: "GET" | "POST",
	options?: RequestInit,
	body?: any,
) {
	const res = await JSON(
		await fetch(`${Deno.env.get("STUDENT_API")}/${endpoint}`, {
			method,
			body,
			...options,
		}),
	) as APIResponse;

	if (res.success !== 1) throw new Error(res.error);

	return res as T;
}
