import { Chain } from "viem";

export const redstoneDevnetL2 = {
  name: "Redstone Devnet Layer 2",
  id: 894,
  network: "redstone-devnet-l2",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://894.quarry.linfra.xyz"],
      webSocket: ["wss://894.quarry.linfra.xyz/ws"],
    },
    public: {
      http: ["https://894.quarry.linfra.xyz"],
      webSocket: ["wss://894.quarry.linfra.xyz/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://894-explorer.quarry.linfra.xyz",
    },
  },
} as const satisfies Chain;
