# Property Subgraph

This subgraph dynamically watches any property created by the `PropertyFactory`. It tracks the current state of `Property` contracts and contains derived stats for global and historical data.

## Requirements

- node v16+
- yarn v1.22+
- graph-node v0.29.0

## Manifest

The manifest is created via the JSON data in the `./config` folder:

```sh
yarn prepare-<network>
```

## Linting

To lint the code with `prettier` run:

```sh
yarn prettier
```

To lint the code with `eslint` run:

```sh
yarn lint
```

## Running Unit Tests

To run the unit tests with the `matchstick` framework run:

```sh
yarn test
```

## Settings

- [x] Set endpoints and subgraph-name in `.env` (for deployment to production graph-node) or `.env.local` (for deployment to local test graph-node) files.
- [x] Make sure `subgraph.yaml` refers to the same contracts and the same blockchain as `.env` / `.env.local`.
- [x] Ensure that the startblocks are the creation blocks of the related contracts in `subgraph.yaml`
- [x] Uncomment the correct values in `./src/mappings/config.ts` according to the blockchain you're intending to use

Then run the following commands:

```sh
yarn
yarn codegen
yarn build
```

## Deployment to a local graph-node

Run the following commands to deploy `Property` subgraph to a local graph-node:

```sh
yarn create-local
yarn deploy-local
```

### Deployment to a remote graph-node

Run the following commands to deploy `Property` subgraph to a remote graph-node:

```sh
yarn run create
yarn deploy
```

### Querying Aggregated Real Estate Market Data

This example query fetches general `Market` data:

```graphql
query Market {
  market(id: "0x01000000") {
    propertyOwnersCount
    usersCount
    propertiesCount
    transfersCount
    transferVolumeUSD
    ownerRoyaltiesDistributedUSD
    brokerRoyaltiesDistributedUSD
    providerRoyaltiesDistributedUSD
    subgraphVersion
  }
}
```

This example query fetches `Property` data:

```graphql
query Property {
  propertyEntities(first: 1, orderBy: date, orderDirection: desc) {
    id
    streetAddress
    legalDescription
    documentationURI
    owner
    broker
    transferAgent
    ownerRoyaltiesBps
    brokerRoyaltiesBps
    providerRoyaltiesBps
    askingPrices(first: 3) {
        tokenAddress
        value
    }
    offeringPrices(first: 3) {
        tokenAddress
        value
    }
    ownerRoyaltiesDistributedUSD
    brokerRoyaltiesDistributedUSD
    providerRoyaltiesDistributedUSD
    txHash
    timestamp
    createdAtTimestamp
    createdAtBlockNumber
  }
}
```

This example query fetches `User` data:

```graphql
query Users {
  users(first: 3) {
    id
    propertiesOwned(first: 3) {
        id
    }
    ownerTransfersCount
    ownerTransferVolumeUSD
    ownerRoyaltiesVolumeUSD
    buyerPaidVolumeUSD
    brokerTransfersCount
    brokerTransferVolumeUSD
    brokerRoyaltiesVolumeUSD
    agentTransfersCount
    agentTransferVolumeUSD
    txHash
    timestamp
    createdAtTimestamp
    createdAtBlockNumber
  }
}
```

