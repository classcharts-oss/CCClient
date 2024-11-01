import { Router } from "express";

const authonly = Router();

authonly.use((req, res, next) => {
    if (!req.session.token) {
        req.flash("danger", "You must be logged in to access this page.");
        return res.redirect("/");
    }
    next();
});

authonly.get("/", (_req, res) => {
    return res.render("logged/student", { title: "Homepage" });
});

authonly.get("/behaviour", (_req, res) => {
    return res.render("logged/behaviour", { title: "Homepage" });
});

export default authonly;