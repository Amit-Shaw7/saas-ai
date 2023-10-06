"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: "600",
})


const LandingNavbar = () => {
    const { data } = useSession();
    const user = data?.user;
    return (
        <div className="p-4 bg-transparent flex items-center justify-between">
            <Link
                href="/"
                className="flex items-center"
            >
                <div className="relative h-8 w-8 mr-4">
                    <Image
                        fill
                        src="/Logo.png"
                        alt="OriginAI"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", montserrat.className)}>OriginAI</h1>
            </Link>

            <div className="flex items-center gap-x-2" >
               <Link href={data?.user ? "/dashboard" : "/login"}>
                    <Button
                        className="rounde-md"
                        variant="outline"
                    >
                        Get started
                    </Button>
               </Link> 
            </div>
        </div>
    )
}

export default LandingNavbar