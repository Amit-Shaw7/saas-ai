import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
    title: string,
    description: string,
    icon: LucideIcon,
    iconColor: string,
    bgColor: string
}
const Heading = ({
    title,
    description,
    icon: Icon,
    iconColor,
    bgColor
}: HeadingProps) => {
    return (
        <>
            <div className="px-4 lg:px-8 flex items-center gap-x-4 mb-8">
                <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                    <Icon className={cn("h-8 md:h-10 w-8 md:w-10", iconColor)} />
                </div>

                <div>
                    <h2 className="text-xl md:text-3xl font-bold">
                        {title}
                    </h2>
                    <p className="text-sm font-semibold text-gray-500">
                        {description}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Heading;