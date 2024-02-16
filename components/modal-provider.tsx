"use client";

import { useEffect, useState } from "react";
import UpgradeModal from "./upgrade-modal";

const UpgradeProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <UpgradeModal />
    </>
  );
};

export default UpgradeProvider;
