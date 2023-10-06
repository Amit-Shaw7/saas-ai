import { checkQueryCountVlaid, incrementQueryCount } from "@/lib/api-limit";
import { checkIsPro } from "@/lib/subscriptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user) {
            return new NextResponse("UNAUTHORIZED", { status: 401 });
        }

        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return new NextResponse("PROMPT_IS_REQUIRED", { status: 400 });
        }

        const freeTrial = await checkQueryCountVlaid();
        const isPro = await checkIsPro();

        if (!freeTrial && !isPro) {
            return new NextResponse("QUERY_LIMIT_EXCEEDED", { status: 403 });
        }

        const response = await replicate.run(
            "cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
            {
                input: {
                    prompt
                }
            }
        );

        if (!isPro) {
            await incrementQueryCount();
        }

        return NextResponse.json(response);
    } catch (error) {
        console.log("VIDEO_ERROR" + error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}

