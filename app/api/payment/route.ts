import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import Subscription from "@/models/Subscription";

export async function POST(req: Request) {
    const body = await req.json();
    const session = await getServerSession();

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
        const value = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedHash = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET || "")
            .update(value.toString())
            .digest("hex");

        if (expectedHash !== razorpay_signature) {
            return new NextResponse("False payment", { status: 400 });
        }

        // Payment is correct

        const user = await User.findOne({ email: session?.user?.email });
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const subscripttion = await Subscription.findOne({ userId: user?._id });
        if (!subscripttion) {
            await Subscription.create({
                userId : user?._id,
                freeQueryCount : 0,
                subscription : "PRO",
                subscriptionType : "MONTHLY",
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })
        }

        subscripttion.subscription = "PRO";
        subscripttion.subscriptionType = "MONTHLY"
        subscripttion.razorpay_order_id = razorpay_order_id,
        subscripttion.razorpay_payment_id = razorpay_payment_id;
        subscripttion.razorpay_signature = razorpay_signature
        await subscripttion.save();

        return new NextResponse("verified", { status: 200 });
    } catch (error) {
        console.log(error);
        
        return new NextResponse("False payment", { status: 500 });
    }
}

