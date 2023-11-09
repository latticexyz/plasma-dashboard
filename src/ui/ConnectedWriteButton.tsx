"use client";

import { Abi } from "viem";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "./Button";
import { WriteButton, type Props as WriteButtonProps } from "./WriteButton";

type Props<
  abi extends Abi | readonly unknown[],
  functionName extends string
> = WriteButtonProps<abi, functionName>;

export function ConnectedWriteButton<
  abi extends Abi | readonly unknown[],
  functionName extends string
>({ write, label, className }: Props<abi, functionName>) {
  const { openConnectModal } = useConnectModal();
  const { address, isConnecting } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork, isLoading: isSwitchingNetwork } = useSwitchNetwork();

  if (!address) {
    if (openConnectModal) {
      return (
        <Button
          className={className}
          pending={isConnecting}
          label={label}
          labelHover="Connect wallet"
          onClick={openConnectModal}
        />
      );
    } else {
      return (
        <Button className={className} label="Cannot connect wallet" disabled />
      );
    }
  }

  if (chain != null && write.chainId != null && chain.id !== write.chainId) {
    if (switchNetwork) {
      return (
        <Button
          className={className}
          pending={isSwitchingNetwork}
          label={label}
          labelHover="Switch network"
          onClick={() => switchNetwork(write.chainId)}
        />
      );
    } else {
      return <Button className={className} label="Wrong network" disabled />;
    }
  }

  return <WriteButton className={className} write={write} label={label} />;
}
