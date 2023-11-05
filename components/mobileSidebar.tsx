"use client";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface FreeCounterProps {
    queryCount?: number;
    isPro?: boolean
}

const MobilleSidebar = ({ queryCount = 0, isPro = false }: FreeCounterProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0 m-0 bg-[#111827]">
                <SheetClose className="text-white" />
                <Sidebar isPro={isPro} queryCount={queryCount} />
            </SheetContent>
        </Sheet>
    )
}

export default MobilleSidebar