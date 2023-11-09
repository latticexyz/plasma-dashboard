"use client";

import { challengeContract } from "@/common";
import { Button } from "@/ui/Button";
import { ModalContent } from "@/ui/ModalContent";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { TertiaryButton } from "@/ui/TertiaryButton";
import { TruncatedHex } from "@/ui/TruncatedHex";
import { UseState } from "@/ui/UseState";
import { ArrowRightIcon } from "@/ui/icons/ArrowRightIcon";
import { TerminalIcon } from "@/ui/icons/TerminalIcon";
import { Dialog } from "@radix-ui/react-dialog";

export default function UIPage() {
  return (
    <div className="flex flex-col gap-8 items-start">
      <div>
        Truncated hex: <TruncatedHex hex={challengeContract} />
      </div>
      <div className="flex gap-2 items-center">
        <Button label="Button" onClick={() => alert("click")} />
        <Button label="Pending" pending onClick={() => alert("click")} />
        <Button label="Disabled" disabled onClick={() => alert("click")} />
      </div>
      <div className="flex gap-2 items-center">
        <Button label="text-xs" className="text-xs" />
        <Button label="text-sm" className="text-sm" />
        <Button label="text-base" className="text-base" />
      </div>
      <div className="flex gap-2">
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
      <div className="flex gap-2 items-center">
        <SecondaryButton label="Secondary" />
        <SecondaryButton label="Secondary" icon={<TerminalIcon />} />
        <SecondaryButton icon={<TerminalIcon />} />
        <SecondaryButton className="text-sm" label="Secondary" />
        <SecondaryButton
          className="text-sm"
          label="Secondary"
          icon={<TerminalIcon />}
        />
        <SecondaryButton className="text-sm" icon={<TerminalIcon />} />
      </div>
      <div className="flex gap-2 items-center">
        <TertiaryButton label="Tertiary" />
        <TertiaryButton label="Tertiary" icon={<ArrowRightIcon />} />
        <TertiaryButton icon={<ArrowRightIcon />} />
        <TertiaryButton className="text-sm" label="Tertiary" />
        <TertiaryButton
          className="text-sm"
          label="Tertiary"
          icon={<ArrowRightIcon />}
        />
        <TertiaryButton className="text-sm" icon={<ArrowRightIcon />} />
      </div>
      <div>
        <Dialog open modal={false}>
          <ModalContent
            title="Modal"
            description="This is a modal. There are many like it, but this one is mine."
          >
            <p>Hello modal!</p>
            <div className="flex flex-col gap-2">
              <Button label="Action" />
              <Button label="Pending" pending />
              <Button label="Disabled" disabled />
            </div>
          </ModalContent>
        </Dialog>
      </div>
    </div>
  );
}
