import { Chain } from "viem";

export const holeskyRedstone = {
  id: 17001,
  network: "holesky-redstone",
  name: "Holesky Redstone",
  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://17001.quarry.linfra.xyz"],
      webSocket: ["wss://17001.quarry.linfra.xyz/ws"],
    },
    public: {
      http: ["https://17001.quarry.linfra.xyz"],
      webSocket: ["wss://17001.quarry.linfra.xyz/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://17001-explorer.quarry.linfra.xyz",
    },
  },
  testnet: true,
} as const satisfies Chain;
