import Razorpay from "razorpay";
declare global {
    interface Window {
        Razorpay: any;
    }
}