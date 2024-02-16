"use client";
import { TextAlignLeftIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SiderBar from "@/components/sidebar";
import { useEffect, useState } from "react";
const MobileSidebar = () => {
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
        <SiderBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
