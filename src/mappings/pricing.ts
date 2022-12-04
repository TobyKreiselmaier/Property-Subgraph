import { Address, BigDecimal } from '@graphprotocol/graph-ts'
import { CHAIN_ID } from './config'
import {
  BD_1,
  BI_0,
  convertAmountToBigDecimal,
  DAI_ADDRESS,
  getReserves,
  getToken0,
  getWETHPair,
  USDC_ADDRESS,
  USDT_ADDRESS,
  WCOIN_ADDRESS,
  WCOIN_DAI_PAIR_ADDRESS,
  WCOIN_USDC_PAIR_ADDRESS,
  WCOIN_USDT_PAIR_ADDRESS
} from './helpers'

export function getCoinUsdPrice(): BigDecimal {
  let coinUsdPrice = BD_1

  switch (CHAIN_ID) {
    // Ethereum: using DAI, USDC, and USDT
    case 1:
      // get reserves
      let daiPairReserves = getReserves(WCOIN_DAI_PAIR_ADDRESS)
      let reserveCoinInDaiPair = convertAmountToBigDecimal(daiPairReserves.value1, WCOIN_ADDRESS)
      let reserveDai = convertAmountToBigDecimal(daiPairReserves.value0, DAI_ADDRESS)
      let usdcPairReserves = getReserves(WCOIN_USDC_PAIR_ADDRESS)
      let reserveCoinInUsdcPair = convertAmountToBigDecimal(usdcPairReserves.value1, WCOIN_ADDRESS)
      let reserveUsdc = convertAmountToBigDecimal(usdcPairReserves.value0, USDC_ADDRESS)
      let usdtPairReserves = getReserves(WCOIN_USDT_PAIR_ADDRESS)
      let reserveCoinInUsdtPair = convertAmountToBigDecimal(usdtPairReserves.value0, WCOIN_ADDRESS)
      let reserveUsdt = convertAmountToBigDecimal(usdtPairReserves.value1, USDT_ADDRESS)

      // calculate weighted average price
      coinUsdPrice = reserveDai
        .times(reserveDai)
        .div(reserveCoinInDaiPair)
        .plus(reserveUsdc.times(reserveUsdc).div(reserveCoinInUsdcPair))
        .plus(reserveUsdt.times(reserveUsdt).div(reserveCoinInUsdtPair))
        .div(reserveDai.plus(reserveUsdc).plus(reserveUsdt))
      break

    // Goerli: currently no well maintained pair available/known for the calculation
    case 5:
      coinUsdPrice = BigDecimal.fromString('1200')
      break
  }

  return coinUsdPrice
}

export function getTokenCoinPrice(tokenAddress: Address): BigDecimal {
  // get address of ERC20 token / WETH pair from Uniswap Factory
  let pair = getWETHPair(tokenAddress)

  // get pair reserves
  let reserves = getReserves(pair)

  // get token0
  let token0 = getToken0(pair)

  // return ETH reserves / token reserves
  if (token0 == tokenAddress && reserves.value0.gt(BI_0)) {
    return convertAmountToBigDecimal(reserves.value1, WCOIN_ADDRESS).div(
      convertAmountToBigDecimal(reserves.value0, tokenAddress)
    )
  } else if (token0 == WCOIN_ADDRESS && reserves.value1.gt(BI_0)) {
    return convertAmountToBigDecimal(reserves.value0, tokenAddress).div(
      convertAmountToBigDecimal(reserves.value1, WCOIN_ADDRESS)
    )
  }

  // return 1 if we can't get a price conversion
  return BD_1
}
