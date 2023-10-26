### Running e2pg

```bash
export DATABASE_URL=postgres:///e2pg && ./e2pg -config config.json
```

### Running the frontend

```
pnpm dev
```

### Example .env

```
DATABASE_URL=postgres:///e2pg
NEXT_PUBLIC_RPC_URL=https://l1.quarry.linfra.xyz
NEXT_PUBLIC_BATCHER_INBOX=0xff00000000000000000000000000000000000892
NEXT_PUBLIC_BATCHER=0xe7774cef7d9775da467f9e9ffef7681d4d3ad59d
NEXT_PUBLIC_CHALLENGE_CONTRACT=0xfd6d23ee2b6b136e34572fc80cbcd33e9787705e
```

### Challenging a commitment

1. clone quarry repo

```
git clone git@github.com:latticexyz/quarry.git
cd quarry/contracts
```

2. find current block number (can only challenge in the challenge window)

```
cast block-number --rpc-url https://l1.quarry.linfra.xyz/
```

3. Update the .env file in `quarry/contracts`

```
RAW_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
CHALLENGE_CONTRACT=0xfd6d23ee2b6b136e34572fc80cbcd33e9787705e
CHALLENGE_HASH=0x9f3cd3a6ae98bb675f9f98ec3a3ca972c99292d3304da27d4cad2279fe29f224
CHALLENGE_PRE_IMAGE=0x00000000000000000000000000000000000000000000000000000000000000067175617272790000000000000000000000000000000000000000000000000000
RPC_URL=https://l1.quarry.linfra.xyz/

CHALLENGE_BLOCK=<current block number>
```

4. Execute the challenge

```
make challenge
```
