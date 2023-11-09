"use client";

import { Abi } from "viem";
import { useSwitchNetwork } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./Button";
import { WriteButton, type Props as WriteButtonProps } from "./WriteButton";

// TODO: minimum balance condition (both eth and bond)

type Props<
  abi extends Abi | readonly unknown[],
  functionName extends string
> = WriteButtonProps<abi, functionName>;

export function ConnectedWriteButton<
  abi extends Abi | readonly unknown[],
  functionName extends string
>({ write, label, className }: Props<abi, functionName>) {
  const { switchNetwork, isLoading } = useSwitchNetwork();

  return (
    <ConnectButton.Custom>
      {({ mounted, account, chain, openConnectModal }) => {
        if (!mounted) {
          return <Button className={className} label={label} disabled />;
        }

        if (!account) {
          return (
            <Button
              className={className}
              label={label}
              labelHover="Connect wallet"
              onClick={openConnectModal}
            />
          );
        }

        if (
          chain != null &&
          write.chainId != null &&
          chain.id !== write.chainId
        ) {
          if (switchNetwork) {
            return (
              <Button
                className={className}
                pending={isLoading}
                label={label}
                labelHover="Switch network"
                onClick={() => switchNetwork(write.chainId)}
              />
            );
          } else {
            // TODO: improve the messaging for this state
            return (
              <Button className={className} label="Wrong network" disabled />
            );
          }
        }

        return (
          <WriteButton className={className} write={write} label={label} />
        );
      }}
    </ConnectButton.Custom>
  );
}
