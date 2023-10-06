import { connectToMongo } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
        return new NextResponse("All feilds are mandatory", { status: 400 });
    }
    connectToMongo();

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse("User does not exist", { status: 404 });
        }

        const verified = await bcrypt.compare(password, user.password);
        if (!verified) {
            return new NextResponse("Incorrect password", { status: 400 });
        }

        return NextResponse.json({
            msg: "Logged succesfull",
            user
        }, { status: 200 });

    } catch (error) {
        console.log("Login error" + error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}

