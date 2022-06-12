import type { NextApiRequest, NextApiResponse } from "next";
import whois from "whois-json";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const url = decodeURIComponent(req.query.url as string);
    const data = await whois(new URL(url).hostname.replace("www.", ""));

    res.status(200).send(data);
    return;
  }

  res.status(405).end();
}
