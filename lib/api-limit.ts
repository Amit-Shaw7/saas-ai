import { auth } from "@clerk/nextjs";
import mongoose from "mongoose";
import LimitQuery from "@/models/LimitQuery";
import { MAX_FREE_COUNT } from "@/constants";
import {connectToMongo} from "@/utils/db";

export const incrementQueryCount = async () => {
    await connectToMongo();
    const { userId } = auth();
    if (!userId) {
        return;
    }

    const limitQuery = await LimitQuery.findOne({ userId });
    if (!limitQuery) {
        await LimitQuery.create({
            userId,
            queryCount: 1
        })
    } else {
        limitQuery.queryCount++;
        await limitQuery.save();
    }

};

export const checkQueryCountVlaid = async () => {
    const { userId } = auth();
    await connectToMongo();

    if (!userId) {
        return false;
    }

    const exists = await LimitQuery.findOne({ userId });
    if (!exists || exists.queryCount < MAX_FREE_COUNT) {
        return true;
    } else {
        return false;
        
    }
}

export const getQueryCount = async () => {
    await connectToMongo();
    const { userId } = auth();
    if (!userId) {
        return 0;
    }

    const limitQuery = await LimitQuery.findOne({ userId });
    return limitQuery.queryCount;
}