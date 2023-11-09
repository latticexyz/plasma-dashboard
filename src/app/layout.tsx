import "tailwindcss/tailwind.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { WalletProvider } from "@/WalletProvider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Availability Dashboard",
  description:
    "Dashboard to visualize quarry/redstone input commitments and data availability challenge status",
};

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <html
      lang="en"
      className={twMerge("bg-black text-white/50", inter.className)}
    >
      <body>
        <WalletProvider>
          <div className="mx-auto max-w-screen-lg py-16">{children}</div>
          <ToastContainer position="bottom-right" theme="dark" />
        </WalletProvider>
      </body>
    </html>
  );
}
