import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { filename, url } = req.query;

  if (!url || typeof url !== "string") {
    res.status(400).json({ error: "Missing url" });

    return;
  }
  try {
    const headers: Record<string, string> = {};

    if (req.headers.authorization) {
      headers["Authorization"] = String(req.headers.authorization);
    }
    if (req.headers.cookie) {
      headers["Cookie"] = String(req.headers.cookie);
    }
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers,
    });
    const data = response.data as Buffer;
    const name = typeof filename === "string" ? filename : "file.pdf";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${name}"`);
    res.status(200).send(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to fetch file", details: error?.message });
  }
}
