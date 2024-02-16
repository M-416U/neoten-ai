"use client";
import { TextAlignLeftIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SiderBar from "@/components/sidebar";
import { useEffect, useState } from "react";
const MobileSidebar = ({
  count = 0,
  isPro = false,
}: {
  count: number;
  isPro: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <TextAlignLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SiderBar count={count} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
