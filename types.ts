import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export type userDetailsType = {
    name?: string,
    email: string,
    password?: string
    access_token?: string
}
export type registerUserType = {
    data: userDetailsType,
    setError: React.Dispatch<React.SetStateAction<string>>,
    router: AppRouterInstance
}
export type loginUserType = {
    data: userDetailsType,
    setError: React.Dispatch<React.SetStateAction<string>>,
    router: AppRouterInstance
}

export type callbackType = {
    user: {
        name: string,
        email: string,
        image?: string,
        access_token?: string
    },
    account: {
        provider: string,
        access_token: string
    }
}

export type razorpayHandlerResponse = {
    razorpay_payment_id: string,
    razorpay_order_id: string,
    razorpay_signature: string,
}

export type InputType = {
    id: string,
    value: string,
    placeholder: string,
    label: string,
    type: string
}