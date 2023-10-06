import { MAX_FREE_COUNT } from "@/constants";
import { connectToMongo } from "@/utils/db";
import User from "@/models/User";
import Subscription from "@/models/Subscription";
import { getServerSession } from "next-auth";

export const incrementQueryCount = async () => {
    await connectToMongo();
    const session = await getServerSession();
    if (!session?.user) {
        return;
    }

    const user = await User.findOne({ email: session?.user?.email });
    const subscription = await Subscription.findOne({ userId: user?._id });
    if (!subscription) {
        await Subscription.create({
            userId : user?._id,
            freeQueryCount: 1,
            subscription : "FREE",
            subscriptionType : "PENDING"
        })
    } else {
        subscription.freeQueryCount++;
        await subscription.save();
    }

};

export const checkQueryCountVlaid = async () => {
    const session = await getServerSession();
    await connectToMongo();

    if (!session?.user) {
        return false;
    }
    const user = await User.findOne({ email: session?.user?.email });
    const subscription = await Subscription.findOne({ userId: user?._id });

    

    if (!subscription || subscription.freeQueryCount < MAX_FREE_COUNT) {
        return true;
    } else {
        return false;

    }
}

export const getQueryCount = async () => {
    await connectToMongo();
    const session = await getServerSession();

    if (!session?.user) {
        return 0;
    }

    const user = await User.findOne({ email: session?.user?.email });
    const subscription = await Subscription.findOne({ userId: user?._id });
    if (!subscription) {
        return 0;
    }
    return subscription.freeQueryCount;
}