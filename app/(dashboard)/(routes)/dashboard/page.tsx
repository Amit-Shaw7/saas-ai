"use client";
import { useRouter } from "next/navigation";
import {
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  ArrowRight
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
]

const Dashboard = () => {
  const router = useRouter();
  const goTo = (href: string) => {
    router.push(href);
  }
  return (
    <div>

      <div className="space-y-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>
        <p className="text-center text-sm md:text-xl text-gray-500">Chat with Ai to get things done easily and quickly and less chances of mistake</p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {
          tools.map((tool) => (
            <Card
              onClick={() => goTo(tool.href)}
              key={tool.label}
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("h-8 , w-8", tool.color)} />
                </div>

                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>

              <ArrowRight size={20} className={cn("h-6 w-6 p-1 rounded-full", tool.bgColor)} />
            </Card>
          ))
        }
      </div>

    </div>
  )
}
export default Dashboard;
