import { connectToMongo } from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
        return new NextResponse("All feilds are mandatory", { status: 400 });
    }

    await connectToMongo();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            name,
            password: hashedPassword
        });
        if (newUser) {
            return NextResponse.json("Registered successfully", { status: 201 });
        } else {
            return new NextResponse("Internal server error", { status: 500 });
        }
    } catch (error) {
        console.log("Register error" + error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}

