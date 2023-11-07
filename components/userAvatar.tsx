"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation";

export function UserAvatar() {
    const { data } = useSession();
    const router = useRouter();
    const user = data?.user;

    const handleLogout = async () => {
        await signOut();
        // router.push('/');
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>
                        {user?.name?.split(" ")[0]?.charAt(0)}
                        {user?.name?.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-30 mr-2">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">{user?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Button onClick={handleLogout} variant='default'>Logout</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
