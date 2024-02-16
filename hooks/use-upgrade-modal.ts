import { create } from "zustand";

type contextData = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUpgradeModal = create<contextData>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
