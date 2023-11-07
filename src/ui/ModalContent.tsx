import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseIcon } from "@/ui/icons/CloseIcon";

export type Props = {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

export function ModalContent({ title, description, children }: Props) {
  return (
    <Dialog.Content className="w-[28rem] bg-neutral-800/60 border border-white/20 flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 items-start">
          <Dialog.Title className="flex-grow text-xl font-mono uppercase text-white">
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
      </div>
      {children}
    </Dialog.Content>
  );
}
