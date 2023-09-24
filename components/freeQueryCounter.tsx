"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNT } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
    queryCount: number
}

const FreeQueryCounter = ({ queryCount = 0 }: FreeCounterProps) => {

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-white text-sm mb-4 space-y-2">
                        <p>{queryCount} / {MAX_FREE_COUNT} Free Queries generated</p>
                        <Progress
                            className="h-3"
                            value={(queryCount / MAX_FREE_COUNT) * 100}
                        />
                    </div>
                    <Button
                        className="w-full"
                        variant="premium"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default FreeQueryCounter;