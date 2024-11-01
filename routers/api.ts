import { Router } from "express";
import { format, parse } from "@std/datetime";
import { LoginResponse } from "../models/login.ts";
import { DoAs } from "../fetching.ts";

const api = Router();

api.post("/login", async (req, res) => {
	const code = req.body.code;
	const dob = req.body.dob;

	if (!code || !dob) {
		return res.status(400).json({ error: "Invalid request" });
	}

	const parsed = format(parse(dob, "yyyy-dd-MM"), "dd/MM/yyyy");

	try {
		const api = await DoAs<LoginResponse>(
			"login",
			"POST",
			undefined,
			new URLSearchParams({ code, dob: parsed }),
		);
		req.session.token = api.meta?.session_id;
		req.flash("success", "Logged in successfully!");
		return res.redirect("/student");
	} catch (e) {
		const error = e as Error;
		req.flash("danger", error.message);
		return res.redirect("/");
	}
});

api.get("/ping", async (req, res) => {
	const token = req.session.token;
	if (!token) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const api = await DoAs("ping", "GET", {
			headers: { "Authorization": `Basic ${token}` },
		});
		return res.json(api);
	} catch (e) {
		const error = e as Error;
		req.session.token = undefined;
		return res.status(401).json({ success: 0, error: error.message });
	}
});

export default api;
