"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Input from "@/components/input";

const UserDetails = () => {
    const { data } = useSession();
    const user = data?.user
    return (
        <div className='mt-10 px-4 lg:px-8 space-y-4 flex'>
            <div className="flex flex-col items-center gap-y-5 w-[300px] md:w-[500px]">
                <Input id="name" label="Name" type="text" value={user?.name!} placeholder="Your name"/>
                <Input id="email" label="Email" type="email" value={user?.email!} placeholder="Your email"/>
                <Input id="phone" label="Phone" type="phone" value="9876543210" placeholder="Name"/>
            </div>
        </div>
    )
}

export default UserDetails