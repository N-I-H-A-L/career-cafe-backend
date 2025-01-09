import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
import USER_ROUTER from "./routes/user.routes.js";
import session from "express-session";
import passport from "passport";
import * as oauth from "./oauth.js";
import jwt from "jsonwebtoken";

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

//secret -> the secret key used to sign cookies so client cannot tamper the cookie, this secret will be used by passport to sign the session cookies.
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/api", USER_ROUTER);

app.get("/auth/signin", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    //const { accessToken } = req.user; Either use this token or generate using JWT.
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );

    res.json({
      message: "OAuth successful",
      token,
      user: req.user,
    });
  }
);

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
