"use client";

import { Abi } from "viem";
import { useSwitchNetwork } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./Button";
import { HoverLabel } from "./HoverLabel";
import { WriteButton, type Props as WriteButtonProps } from "./WriteButton";

// TODO: minimum balance condition (both eth and bond)

type Props<
  abi extends Abi | readonly unknown[],
  functionName extends string
> = WriteButtonProps<abi, functionName>;

export function ConnectedWriteButton<
  abi extends Abi | readonly unknown[],
  functionName extends string
>({ write, label }: Props<abi, functionName>) {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ConnectButton.Custom>
      {({ mounted, account, chain, openConnectModal }) => {
        if (!mounted) {
          return <Button disabled>{label}</Button>;
        }

        if (!account) {
          return (
            <Button onClick={openConnectModal}>
              <HoverLabel label={label} labelHover="Connect wallet" />
            </Button>
          );
        }

        if (
          chain != null &&
          write.chainId != null &&
          chain.id !== write.chainId
        ) {
          if (switchNetwork) {
            return (
              <Button onClick={() => switchNetwork(write.chainId)}>
                <HoverLabel label={label} labelHover="Switch network" />
              </Button>
            );
          } else {
            // TODO: improve the messaging for this state
            return <Button disabled>Wrong network</Button>;
          }
        }

        return <WriteButton write={write} label={label} />;
      }}
    </ConnectButton.Custom>
  );
}
