import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  children: ReactNode;
};

export function Modal({ open, onOpenChange, trigger, children }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-950/80 animate-in fade-in backdrop-blur grid place-items-center overflow-y-auto">
          {children}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
