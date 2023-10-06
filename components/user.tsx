"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import UserDetails from "./userDetails";

const User = () => {
  const { data } = useSession();
  const user = data?.user
  return (
    <div className='mt-10 px-4 lg:px-8 space-y-4 flex w-full  '>
      <div className="md:flex-row flex flex-col gap-x-40 gap-y-20 items-center  w-full">
        <div className="flex flex-col items-center gap-y-2">
          <Avatar className="h-[150px] w-[150px] cursor-pointer">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              {user?.name?.split(" ")[0]?.charAt(0)}
              {user?.name?.split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h3 className='font-bold text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent border-0'>
            PREMIUM
          </h3>
        </div>
        <UserDetails />
      </div>
    </div>
  )
}

export default User