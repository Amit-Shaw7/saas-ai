import MobilleSidebar from "@/components/mobileSidebar";
import { getQueryCount } from "@/lib/api-limit";
import { UserAvatar } from "./userAvatar";
import { checkIsPro } from "@/lib/subscriptions";

const Navbar = async () => {
    const queryLimit = await getQueryCount();
    const isPro = await checkIsPro();

    return (
        <div className="flex items-center p-4">
            <MobilleSidebar isPro={isPro} queryCount={queryLimit} />

            <div className="flex w-full justify-end">
                <UserAvatar />
            </div>
        </div>
    )
}

export default Navbar;