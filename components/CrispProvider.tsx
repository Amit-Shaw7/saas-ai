"use client";
import CrispChat from "@/components/CrispChat";
import { useSession } from "next-auth/react";

export const CrispProvider = () => {
    const {status} = useSession();
    return (
        <>
           {status === "authenticated" && <CrispChat />}
        </>
    )
}