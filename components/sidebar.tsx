"use client";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import FreeQueryCounter from "@/components/freeQueryCounter";
import { routes } from "@/constants";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"],
});

interface SidebarProps {
    queryCount: number;
    isPro : boolean
};

const Sidebar = ({ queryCount = 0 , isPro = false}: SidebarProps) => {
    const pathname = usePathname();
    return (
        <div className="py-4 flex flex-col h-full text-white bg-[#111827]">

            <div className="p-3 flex-1">

                <Link href="/dashboard" className="flex items-center justify-start mb-14">
                    <div className="relative w-10 h-10 mr-4 mb-1">
                        <Image
                            fill
                            alt="Logo"
                            src="/Logo.png"
                        />
                    </div>
                    <h1 className={cn("text-xl font-bold", montserrat.className)}>
                        OriginAI
                    </h1>
                </Link>


                <div>
                    {
                        routes?.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/30 rounded-lg transition",
                                    pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                                    <span className="text-sm">{route.label}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <FreeQueryCounter
                isPro={isPro}
                queryCount={queryCount}
            />
        </div>
    )
};

export default Sidebar;