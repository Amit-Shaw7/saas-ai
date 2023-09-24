import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkQueryCountVlaid, incrementQueryCount } from "@/lib/api-limit";

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("UNAUTHORIZED", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OPENAI_NOT_AUTHORIZED", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("MSG_REQUIRED", { status: 400 });
        }

        const freeTrial = await checkQueryCountVlaid();
        if (!freeTrial) {
            return new NextResponse("QUERY_LIMIT_EXCEEDED", { status: 403 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        await incrementQueryCount();

        return NextResponse.json(response.choices[0].message)
    } catch (error) {
        console.log("[CONVERSATION_ERROR" + error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}

