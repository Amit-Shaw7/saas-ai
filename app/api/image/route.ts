import { checkQueryCountVlaid, incrementQueryCount } from "@/lib/api-limit";
import { checkIsPro } from "@/lib/subscriptions";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user) {
            return new NextResponse("UNAUTHORIZED", { status: 401 });
        }

        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!openai.apiKey) {
            return new NextResponse("OPENAI_NOT_AUTHORIZED", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("PROMPT_IS_REQUIRED", { status: 400 });
        }
        if (!resolution) {
            return new NextResponse("RESOLUTION_IS_REQUIRED", { status: 400 });
        }
        if (!amount) {
            return new NextResponse("AMOUNT_IS_REQUIRED", { status: 400 });
        }

        const freeTrial = await checkQueryCountVlaid();
        const isPro = await checkIsPro();

        if (!freeTrial && !isPro) {
            return new NextResponse("QUERY_LIMIT_EXCEEDED", { status: 403 });
        }

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        });
        if (!isPro) {
            await incrementQueryCount();
        }
        
        return NextResponse.json(response.data)
    } catch (error) {
        console.log("IMAGE_ERROR" + error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}

