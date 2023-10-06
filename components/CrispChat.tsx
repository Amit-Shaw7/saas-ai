"use client";
import React, { useEffect } from 'react';
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("ba338406-5857-46a6-b187-c7dccc579cf9")
    }, []);
    return null
}

export default CrispChat