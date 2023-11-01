import { Chain } from "viem";

export const redstoneDevnetL1 = {
  name: "Redstone Devnet Layer 1",
  id: 888,
  network: "redstone-devnet-l1",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://l1.quarry.linfra.xyz"],
      webSocket: ["wss://l1.quarry.linfra.xyz/ws"],
    },
    public: {
      http: ["https://l1.quarry.linfra.xyz"],
      webSocket: ["wss://l1.quarry.linfra.xyz/ws"],
    },
  },
} as const satisfies Chain;
