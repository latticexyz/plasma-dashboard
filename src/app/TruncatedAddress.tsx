import { Address } from "viem";

type Props = {
  address: Address;
};

export function TruncatedAddress({ address }: Props) {
  // TODO: use flex + overflow ellipsis to make this truncate automatically to container width
  return (
    <>{address.replace(/^(0x[0-9A-F]{4})[0-9A-F]+([0-9A-F]{4})$/i, "$1…$2")}</>
  );
}
