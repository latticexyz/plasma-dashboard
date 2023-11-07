"use client";

import { Button } from "@/ui/Button";
import { ModalContent } from "@/ui/ModalContent";
import { UseState } from "@/ui/UseState";
import { Dialog } from "@radix-ui/react-dialog";

export default function UIPage() {
  return (
    <div className="flex flex-col gap-8 items-start">
      <div className="flex gap-2 text-sm">
        <Button onClick={() => alert("click")}>Button</Button>
        <Button pending onClick={() => alert("click")}>
          Pending
        </Button>
        <Button disabled onClick={() => alert("click")}>
          Disabled
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xs">
          <Button>text-xs</Button>
        </span>
        <span className="text-sm">
          <Button>text-sm</Button>
        </span>
        <Button className="text-base">text-base</Button>
      </div>
      <div className="flex gap-2 text-sm">
        <UseState initialState={false}>
          {([pending, setPending]) => (
            <Button pending={pending} onClick={() => setPending(!pending)}>
              Toggle pending
            </Button>
          )}
        </UseState>
        <UseState initialState={false}>
          {([disabled, setDisabled]) => (
            <Button disabled={disabled} onClick={() => setDisabled(!disabled)}>
              Toggle disabled
            </Button>
          )}
        </UseState>
      </div>
      <div>
        <Dialog open modal={false}>
          <ModalContent
            title="Modal"
            description="This is a modal. There are many like it, but this one is mine."
          >
            <p>Hello modal!</p>
            <Button>Action</Button>
            <Button pending>Pending</Button>
            <Button disabled>Disabled</Button>
          </ModalContent>
        </Dialog>
      </div>
    </div>
  );
}
