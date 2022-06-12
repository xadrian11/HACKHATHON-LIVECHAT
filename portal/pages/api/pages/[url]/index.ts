import type { NextApiRequest, NextApiResponse } from "next";
import { getFlag } from "../../../../lib/flag";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = decodeURIComponent(req.query.url as string);
  const page = await prisma.page.findUnique({ where: { url } });

  if (!page) {
    res.status(404).end();
    return;
  }

  if (req.method === "GET") {
    res.status(200).send({ ...page, flag: getFlag(page) });
    return;
  }

  if (req.method === "PUT") {
    const updatedPage = await prisma.page.update({
      where: { id: page.id },
      data: {
        ...(typeof req.body.upvotes !== "undefined" && {
          upvotes: req.body.upvotes,
        }),
        ...(typeof req.body.downvotes !== "undefined" && {
          downvotes: req.body.downvotes,
        }),
      },
    });

    res.status(202).send({ ...updatedPage, flag: getFlag(updatedPage) });
  }

  if (req.method === "DELETE") {
    await prisma.page.delete({ where: { id: page.id } });
    res.status(204).end();
  }

  res.status(405).end();
}
