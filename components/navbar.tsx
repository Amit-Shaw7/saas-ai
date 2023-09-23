import { UserButton } from "@clerk/nextjs";
import MobilleSidebar from "@/components/mobille-sidebar";

const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <MobilleSidebar />

            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}

export default Navbar;