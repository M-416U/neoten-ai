"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("fef59c12-9c94-4145-8789-7f762ce310c3");
  }, []);

  return null;
};
