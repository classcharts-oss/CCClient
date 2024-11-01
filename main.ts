import { join } from "path";

import express from "npm:express";
import bodyparser from "npm:body-parser";
import cookieparser from "npm:cookie-parser";

import { Sequelize } from "sequelize";
import connectSessionSequelize from "connect-session-sequelize";

import session from "npm:express-session";
import flash from "npm:connect-flash";

import "jsr:@std/dotenv/load";

import api from "./routers/api.ts";
import authonly from "./routers/authonly.ts";

const SequelizeStore = connectSessionSequelize(session.Store);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './session.sqlite'
});

const envCheck = ["SESSION_SECRET", "STUDENT_API"];

for (const key of envCheck) {
	if (!Deno.env.get(key)) {
		console.error(`Please set the variable ${key} in a .env file, or in the environment and then run the server again.`);
		Deno.exit(1);
	}
}

if (import.meta.main) {
	const app = express();

	//#region Config
	app.set("views", join(Deno.cwd(), "views"));
	app.set("view engine", "pug");
	//#endregion

	//#region Middlewares
	app.use(express.static(join(Deno.cwd(), "public")));
	app.use(express.json());
	app.use(session({
		secret: Deno.env.get("SESSION_SECRET"),
		resave: false,
		saveUninitialized: true,
		store: new SequelizeStore({
			db: sequelize,
		}),
	}));
	app.use(flash());
	app.use(bodyparser.urlencoded({ extended: true }));

	app.use((req, res, next) => {
		res.locals.messages = req.flash();
		next();
	});

	sequelize.sync();
	//#endregion

	//#region Routers
	app.use("/api", api);
	app.use("/student", authonly);
	//#endregion

	//#region Frontend
	app.get("/", (req, res) => {
		if (req.session.token) {
			req.flash("info", "You were already logged in.");
			return res.redirect("/student");
		}
		return res.render("index", { title: "Login" });
	});
	//#endregion

	app.listen(3000, () => {
		console.log("Server is running on http://localhost:3000");
	});
}
