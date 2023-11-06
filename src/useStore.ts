import { ReactNode } from "react";
import { create } from "zustand";

type Toast = {
  id: string;
  description: ReactNode;
};

type Store = {
  toasts: readonly Toast[];
  addToast(description: string): Toast;
};

export const useStore = create<Store>((set, get) => ({
  toasts: [],
  addToast(description: string): Toast {
    const toast: Toast = {
      id: `${Date.now().toString()}-${Math.random()}`,
      description,
    };
    set({
      toasts: [toast, ...get().toasts],
    });
    return toast;
  },
}));
