"use client";

import { Button } from "@/ui/Button";
import { ModalContent } from "@/ui/ModalContent";
import { TruncatedHex } from "@/ui/TruncatedHex";
import { UseState } from "@/ui/UseState";
import { Dialog } from "@radix-ui/react-dialog";

export default function UIPage() {
  return (
    <div className="flex flex-col gap-8 items-start">
      <div>
        Truncated hex:{" "}
        <TruncatedHex hex="0xce73b53ac9fbf7197c3fd38b1497137a5d84c8af" />
      </div>
      <div className="flex gap-2 text-sm">
        <Button label="Button" onClick={() => alert("click")} />
        <Button label="Pending" pending onClick={() => alert("click")} />
        <Button label="Disabled" disabled onClick={() => alert("click")} />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xs">
          <Button label="text-xs" />
        </span>
        <span className="text-sm">
          <Button label="text-sm" />
        </span>
        <Button label="text-base" />
      </div>
      <div className="flex gap-2 text-sm">
        <UseState initialState={false}>
          {([pending, setPending]) => (
            <Button
              label="Pending"
              labelHover="Toggle pending"
              pending={pending}
              onClick={() => setPending(!pending)}
            />
          )}
        </UseState>
        <UseState initialState={false}>
          {([disabled, setDisabled]) => (
            <Button
              label="Disabled"
              labelHover="Toggle disabled"
              disabled={disabled}
              onClick={() => setDisabled(!disabled)}
            />
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
            <Button label="Action" />
            <Button label="Pending" pending />
            <Button label="Disabled" disabled />
          </ModalContent>
        </Dialog>
      </div>
    </div>
  );
}
