"use client";

import { Button } from "../Button";

export default function UIPage() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Button onClick={() => alert("click")}>Button</Button>
      <Button pending onClick={() => alert("click")}>
        Pending
      </Button>
      <Button disabled onClick={() => alert("click")}>
        Disabled
      </Button>
    </div>
  );
}
