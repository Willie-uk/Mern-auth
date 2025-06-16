import nodemailer from "nodemailer";
import { APP_PASS, EMAIL_HOST, EMAIL_PORT, GMAIL_USER } from "../constants/env";

export const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: APP_PASS,
  },
});

export const sender = {
  email: GMAIL_USER || "",
  name: "Auth Team",
};
