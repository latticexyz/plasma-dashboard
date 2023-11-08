import { Chain } from "viem";

// TODO: use holesky chain config from wagmi once https://github.com/wagmi-dev/viem/pull/1409 lands in wagmi

export const holesky = {
  id: 17000,
  network: "holesky",
  name: "Holesky",
  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ethereum-holesky.publicnode.com"],
    },
    public: {
      http: ["https://ethereum-holesky.publicnode.com"],
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 77,
    },
  },
  testnet: true,
} as const satisfies Chain;
