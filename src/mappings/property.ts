import { Address, BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { BROKER, OWNER, PROVIDER, SUBGRAPH_VERSION } from './config'
import {
  BD_0,
  BI_0,
  BI_1,
  concatFiltered,
  convertAmountToBigDecimal,
  removeElement
} from './helpers'
import { getCoinUsdPrice, getTokenCoinPrice } from './pricing'
import { Market, Asking, Offering, PropertyEntity, User } from '../../generated/schema' // entities
import {
  AskingPriceUpdate,
  ClosingTable,
  OfferUpdate,
  RoyaltiesPaid,
  RoyaltiesSet
} from '../../generated/templates/Property/Property' // events

let blockNumber: BigInt
let timestamp: BigInt
let txHash: Bytes
let usdPrice: BigDecimal

export function handleAskingPriceUpdate(event: AskingPriceUpdate): void {
  timestamp = event.block.timestamp
  txHash = event.transaction.hash
  let property = PropertyEntity.load(event.address) as PropertyEntity

  // create Asking entity
  let askingId = Bytes.fromHexString(event.address.toHex().concat(event.params.token.toHex()))
  let asking = Asking.load(askingId) as Asking | null
  if (!asking) {
    asking = new Asking(askingId)
    asking.property = event.address
    asking.owner = property.owner as Bytes
    asking.tokenAddress = event.params.token
  }
  asking.value = event.params.value
  asking.txHash = txHash
  asking.timestamp = timestamp

  // connect Asking and Property
  property.askings = concatFiltered(property.askings as Array<Bytes>, [askingId])

  // save entities
  asking.save()
  property.save()
}

export function handleOfferUpdate(event: OfferUpdate): void {
  timestamp = event.block.timestamp
  txHash = event.transaction.hash

  let market = Market.load(Bytes.fromI32(1)) as Market

  // update / create bidder as User entity
  let bidder = User.load(event.params.bidder) as User | null
  if (!bidder) {
    bidder = new User(event.params.bidder)
    bidder.propertiesOwned = new Array<Bytes>()
    bidder.ownerTransfersCount = BI_0
    bidder.ownerTransferVolumeUSD = BD_0
    bidder.ownerRoyaltiesVolumeUSD = BD_0
    bidder.buyerPaidVolumeUSD = BD_0
    bidder.brokerTransfersCount = BI_0
    bidder.brokerTransferVolumeUSD = BD_0
    bidder.brokerRoyaltiesVolumeUSD = BD_0
    bidder.agentTransfersCount = BI_0
    bidder.agentTransferVolumeUSD = BD_0
    bidder.createdAtTimestamp = timestamp
    bidder.createdAtBlockNumber = event.block.number

    // update global counter
    market.usersCount = (market.usersCount as BigInt).plus(BI_1)
  }
  bidder.txHash = txHash
  bidder.timestamp = timestamp

  // create Offering entity
  let offeringId = Bytes.fromHexString(
    event.address.toHex().concat(event.params.token.toHex()).concat(event.params.bidder.toHex())
  )
  let offering = Offering.load(offeringId) as Offering | null
  if (!offering) {
    offering = new Offering(offeringId)
    offering.property = event.address
    offering.bidder = event.params.bidder as Bytes
    offering.tokenAddress = event.params.token
  }
  offering.value = event.params.value
  offering.txHash = txHash
  offering.timestamp = timestamp

  // connect Offering to PropertyEntity
  let property = PropertyEntity.load(event.address) as PropertyEntity
  property.offerings = concatFiltered(property.offerings as Array<Bytes>, [offeringId])

  // save entities
  market.save()
  bidder.save()
  property.save()
  offering.save()
}

export function handleClosingTable(event: ClosingTable): void {
  timestamp = event.block.timestamp
  txHash = event.transaction.hash
  blockNumber = event.block.number
  usdPrice =
    event.params.token == Address.zero()
      ? getCoinUsdPrice()
      : getTokenCoinPrice(event.params.token).times(getCoinUsdPrice())

  let market = Market.load(Bytes.fromI32(1)) as Market

  // update seller as a User entity
  let seller = User.load(event.params.seller) as User
  if ((seller.propertiesOwned as Array<Bytes>).length == 1) {
    market.propertyOwnersCount = (market.propertyOwnersCount as BigInt).minus(BI_1)
  }
  seller.propertiesOwned = removeElement(seller.propertiesOwned as Array<Bytes>, event.address)
  seller.ownerTransfersCount = (seller.ownerTransfersCount as BigInt).plus(BI_1)
  seller.ownerTransferVolumeUSD = convertAmountToBigDecimal(
    event.params.received,
    event.params.token
  ).times(usdPrice)
  seller.txHash = txHash
  seller.timestamp = timestamp

  // update seller as a User entity
  let buyer = User.load(event.params.buyer) as User
  if ((buyer.propertiesOwned as Array<Bytes>).length == 0) {
    market.propertyOwnersCount = (market.propertyOwnersCount as BigInt).plus(BI_1)
  }
  buyer.propertiesOwned = concatFiltered(buyer.propertiesOwned as Array<Bytes>, [
    Bytes.fromHexString(event.address.toHex())
  ])
  buyer.buyerPaidVolumeUSD = convertAmountToBigDecimal(event.params.paid, event.params.token).times(
    usdPrice
  )
  buyer.txHash = txHash
  buyer.timestamp = timestamp

  // update property entity
  let property = PropertyEntity.load(event.address) as PropertyEntity
  property.owner = event.params.buyer
  property.broker = Address.zero()
  property.transferAgent = Address.zero()

  // reset asking prices and offerings
  property.askings = new Array<Bytes>(0)
  property.offerings = new Array<Bytes>(0)

  property.txHash = txHash
  property.timestamp = timestamp

  market.transfersCount = (market.transfersCount as BigInt).plus(BI_1)
  market.transferVolumeUSD = buyer.buyerPaidVolumeUSD

  // save entities
  market.save()
  buyer.save()
  seller.save()
  property.save()
}

export function handleRoyaltiesSet(event: RoyaltiesSet): void {
  timestamp = event.block.timestamp
  txHash = event.transaction.hash
  blockNumber = event.block.number

  // update / create market entity
  let market = Market.load(Bytes.fromI32(1)) as Market | null
  if (!market) {
    market = new Market(Bytes.fromI32(1))
    market.propertyOwnersCount = BI_0
    market.usersCount = BI_0
    market.propertiesCount = BI_0
    market.transfersCount = BI_0
    market.transferVolumeUSD = BD_0
    market.ownerRoyaltiesDistributedUSD = BD_0
    market.brokerRoyaltiesDistributedUSD = BD_0
    market.providerRoyaltiesDistributedUSD = BD_0
    market.subgraphVersion = SUBGRAPH_VERSION
  }

  // update / create property entity
  let property = PropertyEntity.load(event.address) as PropertyEntity | null
  if (!property) {
    property = new PropertyEntity(event.address)
    property.streetAddress = ''
    property.legalDescription = ''
    property.documentationURI = ''
    property.ownerRoyaltiesDistributedUSD = BD_0
    property.brokerRoyaltiesDistributedUSD = BD_0
    property.providerRoyaltiesDistributedUSD = BD_0
    property.createdAtTimestamp = timestamp
    property.createdAtBlockNumber = blockNumber

    // update global counter
    market.propertiesCount = (market.propertiesCount as BigInt).plus(BI_1)
  }
  property.txHash = txHash
  property.timestamp = timestamp

  if (event.params.role.toHex() == OWNER) {
    property.owner = event.params.beneficiary
    property.ownerRoyaltiesBps = event.params.bps
  } else if (event.params.role.toHex() == BROKER) {
    property.broker = event.params.beneficiary
    property.brokerRoyaltiesBps = event.params.bps
  } else if (event.params.role.toHex() == PROVIDER) {
    property.providerRoyaltiesBps = event.params.bps
  }

  // save entities
  property.save()
  market.save()
}

export function handleRoyaltiesPaid(event: RoyaltiesPaid): void {
  timestamp = event.block.timestamp
  txHash = event.transaction.hash
  blockNumber = event.block.number
  usdPrice =
    event.params.token == Address.zero()
      ? getCoinUsdPrice()
      : getTokenCoinPrice(event.params.token).times(getCoinUsdPrice())
  let usdValue = convertAmountToBigDecimal(event.params.value, event.params.token).times(usdPrice)

  let market = Market.load(Bytes.fromI32(1)) as Market
  let property = PropertyEntity.load(event.address) as PropertyEntity
  let beneficiary = User.load(event.params.beneficiary) as User

  if (event.params.role.toHex() == OWNER) {
    market.ownerRoyaltiesDistributedUSD = (market.ownerRoyaltiesDistributedUSD as BigDecimal).plus(
      usdValue
    )
    property.ownerRoyaltiesDistributedUSD = (
      property.ownerRoyaltiesDistributedUSD as BigDecimal
    ).plus(usdValue)
    beneficiary.ownerRoyaltiesVolumeUSD = (beneficiary.ownerRoyaltiesVolumeUSD as BigDecimal).plus(
      usdValue
    )
  } else if (event.params.role.toHex() == BROKER) {
    market.brokerRoyaltiesDistributedUSD = (
      market.brokerRoyaltiesDistributedUSD as BigDecimal
    ).plus(usdValue)
    property.brokerRoyaltiesDistributedUSD = (
      property.brokerRoyaltiesDistributedUSD as BigDecimal
    ).plus(usdValue)
    beneficiary.brokerRoyaltiesVolumeUSD = (
      beneficiary.brokerRoyaltiesVolumeUSD as BigDecimal
    ).plus(usdValue)
  } else if (event.params.role.toHex() == PROVIDER) {
    market.providerRoyaltiesDistributedUSD = (
      market.providerRoyaltiesDistributedUSD as BigDecimal
    ).plus(usdValue)
    property.providerRoyaltiesDistributedUSD = (
      property.providerRoyaltiesDistributedUSD as BigDecimal
    ).plus(usdValue)
  }

  // save entities
  market.save()
  property.save()
  beneficiary.save()
}
