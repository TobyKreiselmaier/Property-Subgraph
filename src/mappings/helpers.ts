import { Address, BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ERC20 } from '../../generated/templates/Property/ERC20'
import { UniswapV2Factory } from '../../generated/templates/Property/UniswapV2Factory'
import {
  UniswapV2Pair,
  UniswapV2Pair__getReservesResult
} from '../../generated/templates/Property/UniswapV2Pair'
import {
  DAI,
  FACTORY,
  USDC,
  USDT,
  WCOIN_DAI_PAIR,
  WCOIN,
  WCOIN_USDC_PAIR,
  WCOIN_USDT_PAIR
} from './config'

// token and pair addresses for USD calculation
export let DAI_ADDRESS = Address.fromString(DAI)
export let USDC_ADDRESS = Address.fromString(USDC)
export let USDT_ADDRESS = Address.fromString(USDT)
export let WCOIN_ADDRESS = Address.fromString(WCOIN)
export let WCOIN_DAI_PAIR_ADDRESS = Address.fromString(WCOIN_DAI_PAIR)
export let WCOIN_USDC_PAIR_ADDRESS = Address.fromString(WCOIN_USDC_PAIR)
export let WCOIN_USDT_PAIR_ADDRESS = Address.fromString(WCOIN_USDT_PAIR)

export let BI_0 = BigInt.fromI32(0)
export let BI_1 = BigInt.fromI32(1)
export let BI_18 = BigInt.fromI32(18)
export let BD_0 = BigDecimal.fromString('0')
export let BD_1 = BigDecimal.fromString('1')

export function concatFiltered(array1: Array<Bytes>, array2: Array<Bytes>): Array<Bytes> {
  return array1.concat(array2).filter((item, index, array) => array.indexOf(item) === index)
}

export function removeElement(array: Array<Bytes>, element: Bytes): Array<Bytes> {
  // element found in array
  if (array.indexOf(element) > -1) {
    array.splice(array.indexOf(element), 1)
  }

  return array
}

export function getDecimals(tokenAddress: Address): BigInt {
  if (tokenAddress == Address.zero()) {
    return BI_18
  }

  // we want at least one call in the while loop
  let callReverted = true
  let attempts = 10

  // retry up to 10 times
  while (callReverted && attempts-- > 0) {
    let result = ERC20.bind(tokenAddress).try_decimals()
    callReverted = result.reverted
    if (!callReverted) {
      return BigInt.fromI32(result.value)
    }
  }

  // if we can't get a value, default to 18 decimals
  return BigInt.fromI32(18)
}

export function convertAmountToBigDecimal(amount: BigInt, tokenAddress: Address): BigDecimal {
  // checking for 0 amount avoids calculation errors and an unnecessary contract call
  if (amount == BI_0) {
    return BD_0

    // checking for wrapped coin avoids an unnecessary contract call
  } else if (tokenAddress == WCOIN_ADDRESS) {
    return amount.toBigDecimal().div(BigInt.fromI32(10).pow(18).toBigDecimal())
  }
  let decimals = getDecimals(tokenAddress).toI32()
  if (decimals == 0) {
    return amount.toBigDecimal()
  }

  return amount.toBigDecimal().div(
    BigInt.fromI32(10)
      .pow(decimals as u8)
      .toBigDecimal()
  )
}

export function getWETHPair(tokenAddress: Address): Address {
  // we want at least one call in the while loop
  let callReverted = true
  let attempts = 10

  // retry up to 10 times
  while (callReverted && attempts-- > 0) {
    let result = UniswapV2Factory.bind(Address.fromString(FACTORY)).try_getPair(
      tokenAddress,
      WCOIN_ADDRESS
    )
    callReverted = result.reverted
    if (!callReverted) {
      return result.value
    }
  }

  return Address.zero()
}

export function getReserves(pairAddress: Address): UniswapV2Pair__getReservesResult {
  // we want at least one call in the while loop
  let callReverted = true
  let attempts = 10

  // retry up to 10 times
  while (callReverted && attempts-- > 0) {
    let result = UniswapV2Pair.bind(pairAddress).try_getReserves()
    callReverted = result.reverted
    if (!callReverted) {
      return result.value
    }
  }

  return new UniswapV2Pair__getReservesResult(BI_0, BI_0, BI_0)
}

export function getToken0(pairAddress: Address): Address {
  // we want at least one call in the while loop
  let callReverted = true
  let attempts = 10

  // retry up to 10 times
  while (callReverted && attempts-- > 0) {
    let result = UniswapV2Pair.bind(pairAddress).try_token0()
    callReverted = result.reverted
    if (!callReverted) {
      return result.value
    }
  }

  return Address.zero()
}
