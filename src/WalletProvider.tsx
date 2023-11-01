"use client";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { redstoneDevnetL2 } from "./chains/redstoneDevnetL2";
import { redstoneDevnetL1 } from "./chains/redstoneDevnetL1";

const { chains, publicClient } = configureChains(
  [redstoneDevnetL2, redstoneDevnetL1],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Redstone DAC Dashboard",
  projectId: "fdc0458137210b399488c8eb335d0180",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

type Props = {
  children: ReactNode;
};

export function WalletProvider({ children }: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
