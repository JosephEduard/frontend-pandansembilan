import type { NextApiRequest, NextApiResponse } from "next";

import nodemailer from "nodemailer";

type Data =
  | { ok: true; messageId: string }
  | { ok: false; error: string; details?: unknown };

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { date, email, firstName, lastName, message } = req.body || {};

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof date !== "string" ||
    typeof message !== "string"
  ) {
    return res.status(400).json({ ok: false, error: "Invalid payload" });
  }

  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !isValidEmail(email) ||
    !message.trim()
  ) {
    return res.status(400).json({ ok: false, error: "Validation failed" });
  }

  try {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 0);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM;
    const to = process.env.TARGET_EMAIL || "badakpower10000@gmail.com";

    if (!host || !port || !user || !pass || !from) {
      return res.status(500).json({ ok: false, error: "SMTP not configured" });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: { user, pass },
    });

    const subject = `Kontak Baru: ${firstName} ${lastName}`;
    const text = [
      `Nama: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Tanggal: ${date}`,
      "",
      "Pesan:",
      message,
    ].join("\n");

    const info = await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });

    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Email send failed",
      details: (err as Error).message,
    });
  }
}
