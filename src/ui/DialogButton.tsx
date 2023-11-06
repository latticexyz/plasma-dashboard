import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "@/ui/icons/CloseIcon";

type Props = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DialogButton({ label, children }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={twMerge(
            "flex items-center px-3 py-2 gap-2 bg-white text-black"
          )}
        >
          {label}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-900/90 grid place-items-center overflow-y-auto">
          <Dialog.Content className="bg-black p-20 relative">
            <Dialog.Close
              className="absolute top-0 right-0 text-xl p-2 hover:text-white"
              title="Close"
            >
              <CloseIcon />
            </Dialog.Close>
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
