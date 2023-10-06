import Image from "next/image";
import React from "react";

const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="h-10 w-10 relative animate-spin">
                <Image
                    fill
                    src="/Logo.png"
                    alt="Loading..."
                />
            </div>
            <p className="text-gray-500 text-sm text-center font-semibold">
                OriginAI is thinking...
            </p>
        </div>
    )
}

export default Loader