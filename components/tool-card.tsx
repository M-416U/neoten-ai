"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ForwardRefExoticComponent } from "react";

type CardProps = {
  tool: {
    label: string;
    icon: ForwardRefExoticComponent<any>;
    href: string;
    color: string;
    bgColor: string;
  };
};
const ToolCard: React.FC<CardProps> = ({ tool }) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(tool.href)}
      key={tool.href}
      className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center gap-x-4">
        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
          <tool.icon className={cn("w-8 h-8", tool.color)} />
        </div>
        <div className="font-semibold">{tool.label}</div>
      </div>
      <ArrowRightIcon className="w-5 h-5" />
    </Card>
  );
};

export default ToolCard;
