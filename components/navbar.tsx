import { UserButton } from "@clerk/nextjs";
import MobilleSidebar from "@/components/mobille-sidebar";
import { getQueryCount } from "@/lib/api-limit";

const Navbar = async () => {
    const queryLimit = await getQueryCount();
    return (
        <div className="flex items-center p-4">
            <MobilleSidebar queryCount={queryLimit}/>

            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}

export default Navbar;