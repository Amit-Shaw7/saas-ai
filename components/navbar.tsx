import MobilleSidebar from "@/components/mobileSidebar";
import { getQueryCount } from "@/lib/api-limit";
import { Button } from "./ui/button";
import { PersonStanding } from "lucide-react";
import { signOut } from "next-auth/react";
import { UserAvatar } from "./userAvatar";

const Navbar = async () => {
    const queryLimit = await getQueryCount();
    return (
        <div className="flex items-center p-4">
            <MobilleSidebar queryCount={queryLimit} />

            <div className="flex w-full justify-end">
                <UserAvatar />
            </div>
        </div>
    )
}

export default Navbar;