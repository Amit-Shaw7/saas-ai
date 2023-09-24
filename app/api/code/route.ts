import { checkQueryCountVlaid, incrementQueryCount } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use comments for explanations."
}

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
            messages: [instructionMessage, ...messages]
        });

        await incrementQueryCount();

        return NextResponse.json(response.choices[0].message)
    } catch (error) {
        console.log("[CODE_ERROR" + error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}

