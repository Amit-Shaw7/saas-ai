import Image from "next/image";
import React from "react";

interface EmptyProps {
    label: string
}

export const Empty = ({ label }: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="h-60 w-60 relative">
                <Image
                    fill
                    src="/empty.png"
                    alt="No conversations"
                />
            </div>
            <p className="text-gray-500 text-sm text-center font-semibold">
                {label}
            </p>
        </div>
    )
};