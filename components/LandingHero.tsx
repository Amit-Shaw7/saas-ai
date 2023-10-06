"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import TypeWriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

const LandingHero = () => {
    const { data, status } = useSession();
    return (
        <div className=' h-[90vh] text-white font-bold py-36 text-center space-y-10'>
            <div className='space-y-5 font-extrabold'>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">AI tool to help you in</h1>
                <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                    <TypeWriterComponent
                        options={{
                            strings: [
                                "As a Chatbot",
                                "Photo Generation",
                                "Video Generation",
                                "Music Generation",
                                "Code Generation",
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </h1>
            </div>

            <h6 className="text-sm font-bold md:text-xl text-zinc-400">
                Chat with AI and become 10x more productive
            </h6>

            <div>
                <Link href={status === "authenticated" ? "/dashboard" : "/login"}>
                        <Button variant="premium" className="md:text-lg p-4  md:p-6 rounded-full">
                            Get started for free
                        </Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingHero