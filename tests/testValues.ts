import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

// random test addresses
export const ADDRESS_1 = Address.fromString(ACCOUNT_1)
export const ADDRESS_2 = Address.fromString(ACCOUNT_2)
export const ADDRESS_3 = Address.fromString(ACCOUNT_3)
export const ADDRESS_4 = Address.fromString(ACCOUNT_4)
export const ADDRESS_5 = Address.fromString(ACCOUNT_5)

// random BD values
export let BD_SMALL_TEST_VALUE = BigDecimal.fromString('4500.05')
export let BD_MEDIUM_TEST_VALUE = BigDecimal.fromString('1200000.05')

// random BI values
export let BI_3 = BigInt.fromI32(3)
export let BI_50 = BigInt.fromI32(50)
export let BI_100 = BigInt.fromI32(100)
export let BI_SMALL_TEST_VALUE = BigInt.fromI64(1000000000000000000)
export let BI_MEDIUM_TEST_VALUE = BigInt.fromI64(4000000000000000000)
export let BI_LARGE_TEST_VALUE = BigInt.fromI64(1000000000000000000000)

// test strings
export const ACCOUNT_1 = '0x8c47e52a34dd3e5d538d42112c0c0029676921f1'
export const ACCOUNT_2 = '0x6580b72e1a7bef9322b9af1f27f73195542fd83f'
export const ACCOUNT_3 = '0xede74cee21cb0e0eab0765380f73a1828ca92f5c'
export const ACCOUNT_4 = '0x27eed0a8f413d8a85d17a1082df81cd9115144c8'
export const ACCOUNT_5 = '0xfbcb61686b70658bcec48ca176d0faaa891ec09a'
export const DOCUMENTATION_URI =
  'https://www.zillow.com/homes/142-Mountain-Trce-Ellijay,-GA-30540_rb/2062365492_zpid/'
export const LEGAL_DESCRIPTION =
  'All that tract or parcel of land lying and being in the City of Ellijay in Land Lots 61 and 84 of the 11th District and 2nd Section of Gilmer County, Georgia, designated as Tract 5, containing 0.827 acre; as per plat of survey of River Chase, made by Greer Dover, County Surveyor of Gilmer County, Georgia, dated June, 1989, recorded in Plat Book 18, page 10, Gilmer County Records; which reference is made for the purpose of incorporating the same as a part herein.'
export const mockHash = '0xa16081f360e3847006db660bae1c6d1b2e17ec2a' // Matchstick hash for first tx / block
export const ONE = '0x01000000'
export const STREET_ADDRESS = '142 Mountain Trace, Ellijay, Georgia 30540, USA'
export const ZERO = '0x0000000000000000000000000000000000000000'
