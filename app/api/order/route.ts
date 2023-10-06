import { instance } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { price } = body;
    try {
        var options = {
            amount: price * 1000,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await instance.orders.create(options);
        console.log(order);
        return NextResponse.json({
            success: true,
            order
        }, {status : 200})

    } catch (error) {
        const err = JSON.stringify(error);
        console.log("RAZORPAY_ERROR" + JSON.parse(err));
        return new NextResponse("Internal server error", { status: 500 })
    }
}

