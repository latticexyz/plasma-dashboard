import "tailwindcss/tailwind.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Availability Dashboard",
  description:
    "Dashboard to visualize quarry/redstone input commitments and data availability challenge status",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={twMerge("bg-black text-white/50", inter.className)}
    >
      <body>{children}</body>
    </html>
  );
}
