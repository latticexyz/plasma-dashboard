"use client";

import { Button } from "@/ui/Button";

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
    </div>
  );
}
