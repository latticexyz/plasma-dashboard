import { Chain } from "viem";

export const redstoneDevnetL2 = {
  name: "Redstone Devnet Layer 2",
  id: 892,
  network: "redstone-devnet-l2",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://892.quarry.linfra.xyz"],
      webSocket: ["wss://892.quarry.linfra.xyz/ws"],
    },
    public: {
      http: ["https://892.quarry.linfra.xyz"],
      webSocket: ["wss://892.quarry.linfra.xyz/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://892-explorer.quarry.linfra.xyz",
    },
  },
} as const satisfies Chain;
