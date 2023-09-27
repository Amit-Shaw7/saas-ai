"use client";
import React, { useEffect, useState } from "react";
import ProModal from "@/components/proModal";

const ModalProvider = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null
    }
    return (
        <div>
            <ProModal />
        </div>
    )
}

export default ModalProvider;