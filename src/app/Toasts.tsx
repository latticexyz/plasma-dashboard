"use client";

import { useStore } from "@/useStore";
import * as Toast from "@radix-ui/react-toast";

export function Toasts() {
  const toasts = useStore((state) => state.toasts);
  return (
    <Toast.Provider>
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          open
          className="bg-white text-black p-3 leading-none"
        >
          <Toast.Description>{toast.description}</Toast.Description>
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed bottom-0 right-0 z-10 flex flex-col p-8 gap-2" />
    </Toast.Provider>
  );
}
