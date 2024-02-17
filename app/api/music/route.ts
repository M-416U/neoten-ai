import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt are required", { status: 400 });
    }
    const isFreeTrail = await checkApiLimit(userId);
    const isPro = await checkSubscription();
    if (!isFreeTrail && !isPro) {
      return new NextResponse("FreeTrail has ended", { status: 403 });
    }
    const response = await replicate.run(
      "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
      {
        input: {
          model_version: "stereo-melody-large",
          prompt,
        },
      }
    );
    !isPro && (await increaseApiLimit(userId));
    return NextResponse.json(response);
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
