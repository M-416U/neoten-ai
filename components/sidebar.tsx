"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import {
  DashboardIcon,
  ChatBubbleIcon,
  ImageIcon,
  VideoIcon,
  CodeIcon,
  GearIcon,
  SpeakerLoudIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import FreeCounter from "./free-counter";

const font = Montserrat({ weight: ["600"], subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: ChatBubbleIcon,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: SpeakerLoudIcon,
    color: "text-emerald-500",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-green-700",
    href: "/code",
  },
  {
    label: "Settings",
    icon: GearIcon,
    href: "/settings",
  },
];

const SiderBar = ({
  count = 0,
  isPro = false,
}: {
  count: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col h-full relative py-4 space-y-4 text-white bg-gray-900 w-full">
      <div className="flex-1 px-3 py-3">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <Image
            src={"/logo.png"}
            alt="Neoten Logo"
            width={32}
            height={32}
            className="mr-4"
          />
          <h1 className={cn("text-2xl font-bold", font.className)}>Neoten</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm flex font-medium p-3 gap-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg ",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {!isPro && <FreeCounter count={count} />}
    </aside>
  );
};

export default SiderBar;
