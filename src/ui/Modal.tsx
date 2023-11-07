import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "@/ui/icons/CloseIcon";

type Props = {
  title?: ReactNode;
  description?: ReactNode;
  trigger?: ReactNode;
  children: ReactNode;
};

export function Modal({ title, trigger, description, children }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-950/80 animate-in fade-in backdrop-blur grid place-items-center overflow-y-auto">
          <Dialog.Content className="w-[28rem] bg-neutral-800/60 border border-white/20 flex flex-col gap-4 p-5">
            <div className="flex gap-4 items-start">
              <Dialog.Title className="flex-grow text-xl leading-tight font-mono uppercase text-white">
                {title}
              </Dialog.Title>
              <Dialog.Close
                className="flex-shrink-0 text-xl p-2 -m-2 transition text-white/40 hover:text-white"
                title="Close"
              >
                <CloseIcon />
              </Dialog.Close>
            </div>
            {description ? (
              <Dialog.Description className="text-white text-sm">
                {description}
              </Dialog.Description>
            ) : null}
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
