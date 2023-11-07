import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { ModalContent, Props as ModalContentProps } from "./ModalContent";

export type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
} & ModalContentProps;

export function Modal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-950/80 animate-in fade-in backdrop-blur grid place-items-center overflow-y-auto">
          <ModalContent title={title} description={description}>
            {children}
          </ModalContent>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
