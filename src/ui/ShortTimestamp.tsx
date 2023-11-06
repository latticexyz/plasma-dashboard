"use client";

type Props = {
  timestamp: number;
};

export function ShortTimestamp({ timestamp }: Props) {
  const date = new Date(timestamp * 1000);
  return (
    <>
      {date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      })}{" "}
      {date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </>
  );
}
