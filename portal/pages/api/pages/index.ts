import type { NextApiRequest, NextApiResponse } from "next";
import { getFlag } from "../../../lib/flag";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const pages = await prisma.page.findMany();
    res
      .status(200)
      .send(pages.map((page) => ({ ...page, flag: getFlag(page) })));
    return;
  }

  if (req.method === "POST") {
    const data = req.body;

    if (await prisma.page.findUnique({ where: { url: data.url } })) {
      res.status(409).send({ error: "Page with given URL already exists" });
      return;
    }

    const newPage = await prisma.page.create({ data });

    res.status(201).send(newPage);
    return;
  }

  res.status(405).end();
}
