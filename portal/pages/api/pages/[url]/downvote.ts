import type { NextApiRequest, NextApiResponse } from "next";
import { getFlag } from "../../../../lib/flag";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const url = decodeURIComponent(req.query.url as string);
    const page = await prisma.page.findUnique({ where: { url } });

    if (!page) {
      res.status(404).end();
      return;
    }

    const updatedPage = await prisma.page.update({
      where: { id: page.id },
      data: { downvotes: page.downvotes + 1 },
    });
    res.status(202).send({ ...updatedPage, flag: getFlag(updatedPage) });

    return;
  }

  res.status(405).end();
}
