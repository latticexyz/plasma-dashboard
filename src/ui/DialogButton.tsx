import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { Modal } from "./Modal";

type Props = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DialogButton({ label, children }: Props) {
  return (
    <Modal
      title="Unlock bond"
      description="just do the thing"
      trigger={
        <button
          type="button"
          className={twMerge(
            "flex items-center px-3 py-2 gap-2 bg-white text-black"
          )}
        >
          {label}
        </button>
      }
    >
      {children}
    </Modal>
  );
}
