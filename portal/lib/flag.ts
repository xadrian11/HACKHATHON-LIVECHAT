import { Page } from "@prisma/client";

type Flag = "green" | "orange" | "red";

export function getFlag(page: Page): Flag {
  let flag: Flag = "green";

  if (page.upvotes + page.downvotes >= 5) {
    const rate = page.downvotes / page.upvotes;

    if (rate >= 1) {
      flag = "orange";
    }
    if (rate >= 3) {
      flag = "red";
    }
  }

  return flag;
}
