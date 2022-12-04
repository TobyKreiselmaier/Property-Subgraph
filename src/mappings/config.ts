/* General */
export const SUBGRAPH_VERSION = '0.1.0' // update with changelog

export const BROKER = '0x7395af2ec1d18e55ecb857fa7e8cbc9c78ce136fa91d614cd0954d357a2e75e1' // bytes32(keccak256('LISTING_BROKER_ROLE'))
export const OWNER = '0xfeb983a7695463ef5b6eb7089f94f157c3c925417d08e4762b54797793ffd028' // bytes32(keccak256('PROPERTY_OWNER_ROLE'))
export const PROVIDER = '0x18d9ff454de989bd126b06bd404b47ede75f9e65543e94e8d212f89d7dcbb87c' // bytes32(keccak256('PROVIDER_ROLE'))

// Factory for ERC20 ETH price calculation (same address on all chains)
export const FACTORY = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' // Uniswap V2

/* Ethereum */

// export const CHAIN_ID = 1

// // Pairs for ETH USD price calculation
// export const WCOIN_DAI_PAIR = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11' // T0: DAI, T1: WETH
// export const WCOIN_USDC_PAIR = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc' // T0: USDC, T1: WETH
// export const WCOIN_USDE_PAIR = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
// export const WCOIN_USDT_PAIR = '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852' // T0: WETH, T1: USDT

// // Tokens for ETH USD price calculation
// export const WCOIN = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // WETH
// export const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'
// export const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
// export const USDE = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
// export const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'

/* Goerli */

export const CHAIN_ID = 5

// Pairs for ETH USD price calculation
export const WCOIN_DAI_PAIR = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
export const WCOIN_USDC_PAIR = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
export const WCOIN_USDE_PAIR = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
export const WCOIN_USDT_PAIR = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation

// Tokens for ETH USD price calculation
export const WCOIN = '0x515b3e16623e11fEA71680f2bD0F40907c56A332' // WETH
export const DAI = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
export const USDC = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
export const USDE = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
export const USDT = '0x0000000000000000000000000000000000000000' // not available and currently not used for calculation
