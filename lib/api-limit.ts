import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { MAX_API_LIMIT } from "@/constants";

const { userId } = auth();
export const increaseApiLimit = async () => {
  if (!userId) return null;

  const userLimit = await db.apiLimit.findUnique({ where: { userId } });

  if (userLimit) {
    await db.apiLimit.update({
      where: { userId },
      data: {
        count: userLimit.count + 1,
      },
    });
  } else {
    await db.apiLimit.create({
      data: { userId, count: 1 },
    });
  }
};
export const checkApiLimit = async () => {
  if (!userId) return false;
  const currentCount = await db.apiLimit.findUnique({
    where: { userId },
  });
  if (!currentCount?.count || currentCount.count < MAX_API_LIMIT) {
    return true;
  } else {
    return false;
  }
};
export const getApliLimit = async () => {
  if (!userId) return 0;
  const currentCount = await db.apiLimit.findUnique({
    where: { userId },
  });
  if (!currentCount) {
    return 0;
  } else {
    return currentCount.count;
  }
};
