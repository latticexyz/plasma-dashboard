/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  webpack: (config, context) => {
    // See https://github.com/rainbow-me/rainbowkit/pull/1236/files#diff-42f56ed5b6c2d7944e36e1d8c2d90a179b079096a4a0651295f52b634a90ce33
    config.resolve.fallback = { fs: false, net: false, tls: false };
    // See https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1712429322
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
