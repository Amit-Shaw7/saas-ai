import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export const checkIsPro = async () => {
    const session = await getServerSession();
    if (!session?.user) {
        return false;
    }

    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
        return false;
    }

    const subscription = await Subscription.findOne({ userId: user?._id });
    if (!subscription) {
        return false;
    }

    if (subscription.subscription !== "PRO") {
        return false;
    } else {
        return true;
    }
};