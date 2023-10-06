import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    freeQueryCount: {
        type: Number,
        required: true,
        default: 0
    },
    subscription: {
        type: String,
        enum: ["FREE", "PRO"],
        default: "FREE",
        required: true
    },
    subscriptionType: {
        type: String,
        enum: ["PENDING", "MONTHLY", "YEARLY"],
        default: "PENDING",
        required: true
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_signature: {
        type: String,
    },

}, { timestamps: true });

const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;