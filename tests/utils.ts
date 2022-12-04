import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts'
import { newMockEvent } from 'matchstick-as'
import { PropertyCreated } from '../generated/PropertyFactory/PropertyFactory' // event
import { handlePropertyCreated } from '../src/mappings/factory' // event handlers
import {
  AskingPriceUpdate,
  ClosingTable,
  OfferUpdate,
  RoyaltiesPaid,
  RoyaltiesSet
} from '../generated/templates/Property/Property' // events
import {
  handleAskingPriceUpdate,
  handleClosingTable,
  handleOfferUpdate,
  handleRoyaltiesPaid,
  handleRoyaltiesSet
} from '../src/mappings/property' // event handlers

// used to create a new `PropertyCreated` test event
export function createPropertyCreatedEvent(
  property: Address,
  streetAddress: string,
  legalDescription: string,
  documentationURI: string,
  owner: Address,
  broker: Address,
  agent: Address,
  ownerRoyalties: BigInt,
  brokerRoyalties: BigInt,
  providerRoyalties: BigInt
): PropertyCreated {
  let newPropertyCreatedEvent = changetype<PropertyCreated>(newMockEvent())
  newPropertyCreatedEvent.parameters = [
    new ethereum.EventParam('property', ethereum.Value.fromAddress(property)),
    new ethereum.EventParam('streetAddress', ethereum.Value.fromString(streetAddress)),
    new ethereum.EventParam('legalDescription', ethereum.Value.fromString(legalDescription)),
    new ethereum.EventParam('documentationURI', ethereum.Value.fromString(documentationURI)),
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)),
    new ethereum.EventParam('broker', ethereum.Value.fromAddress(broker)),
    new ethereum.EventParam('agent', ethereum.Value.fromAddress(agent)),
    new ethereum.EventParam('ownerRoyalties', ethereum.Value.fromUnsignedBigInt(ownerRoyalties)),
    new ethereum.EventParam('brokerRoyalties', ethereum.Value.fromUnsignedBigInt(brokerRoyalties)),
    new ethereum.EventParam(
      'providerRoyalties',
      ethereum.Value.fromUnsignedBigInt(providerRoyalties)
    )
  ]

  return newPropertyCreatedEvent
}

// used to handle `PropertyCreated` test events
export function handleNewPropertyCreatedEvents(events: PropertyCreated[]): void {
  events.forEach((event) => {
    handlePropertyCreated(event)
  })
}

// used to create a new `AskingPriceUpdate` test event
export function createAskingPriceUpdateEvent(token: Address, value: BigInt): AskingPriceUpdate {
  let newAskingPriceUpdateEvent = changetype<AskingPriceUpdate>(newMockEvent())
  newAskingPriceUpdateEvent.parameters = [
    new ethereum.EventParam('token', ethereum.Value.fromAddress(token)),
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value))
  ]

  return newAskingPriceUpdateEvent
}

// used to handle `AskingPriceUpdate` test events
export function handleNewAskingPriceUpdateEvents(events: AskingPriceUpdate[]): void {
  events.forEach((event) => {
    handleAskingPriceUpdate(event)
  })
}

// used to create a new `ClosingTable` test event
export function createClosingTableEvent(
  seller: Address,
  buyer: Address,
  token: Address,
  received: BigInt,
  paid: BigInt
): ClosingTable {
  let newClosingTableEvent = changetype<ClosingTable>(newMockEvent())
  newClosingTableEvent.parameters = [
    new ethereum.EventParam('seller', ethereum.Value.fromAddress(seller)),
    new ethereum.EventParam('buyer', ethereum.Value.fromAddress(buyer)),
    new ethereum.EventParam('token', ethereum.Value.fromAddress(token)),
    new ethereum.EventParam('received', ethereum.Value.fromUnsignedBigInt(received)),
    new ethereum.EventParam('paid', ethereum.Value.fromUnsignedBigInt(paid))
  ]

  return newClosingTableEvent
}

// used to handle `ClosingTable` test events
export function handleNewClosingTableEvents(events: ClosingTable[]): void {
  events.forEach((event) => {
    handleClosingTable(event)
  })
}

// used to create a new `OfferUpdate` test event
export function createOfferUpdateEvent(
  bidder: Address,
  token: Address,
  value: BigInt
): OfferUpdate {
  let newOfferUpdateEvent = changetype<OfferUpdate>(newMockEvent())
  newOfferUpdateEvent.parameters = [
    new ethereum.EventParam('bidder', ethereum.Value.fromAddress(bidder)),
    new ethereum.EventParam('token', ethereum.Value.fromAddress(token)),
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value))
  ]

  return newOfferUpdateEvent
}

// used to handle `OfferUpdate` test events
export function handleNewOfferUpdateEvents(events: OfferUpdate[]): void {
  events.forEach((event) => {
    handleOfferUpdate(event)
  })
}

// used to create a new `RoyaltiesPaid` test event
export function createRoyaltiesPaidEvent(
  beneficiary: Address,
  token: Address,
  value: BigInt,
  role: Bytes
): RoyaltiesPaid {
  let newRoyaltiesPaidEvent = changetype<RoyaltiesPaid>(newMockEvent())
  newRoyaltiesPaidEvent.parameters = [
    new ethereum.EventParam('beneficiary', ethereum.Value.fromAddress(beneficiary)),
    new ethereum.EventParam('token', ethereum.Value.fromAddress(token)),
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value)),
    new ethereum.EventParam('role', ethereum.Value.fromFixedBytes(role))
  ]

  return newRoyaltiesPaidEvent
}

// used to handle `RoyaltiesPaid` test events
export function handleNewRoyaltiesPaidEvents(events: RoyaltiesPaid[]): void {
  events.forEach((event) => {
    handleRoyaltiesPaid(event)
  })
}

// used to create a new `RoyaltiesSet` test event
export function createRoyaltiesSetEvent(
  beneficiary: Address,
  bps: BigInt,
  role: Bytes
): RoyaltiesSet {
  let newRoyaltiesSetEvent = changetype<RoyaltiesSet>(newMockEvent())
  newRoyaltiesSetEvent.parameters = [
    new ethereum.EventParam('beneficiary', ethereum.Value.fromAddress(beneficiary)),
    new ethereum.EventParam('bps', ethereum.Value.fromUnsignedBigInt(bps)),
    new ethereum.EventParam('role', ethereum.Value.fromFixedBytes(role))
  ]

  return newRoyaltiesSetEvent
}

// used to handle `RoyaltiesSet` test events
export function handleNewRoyaltiesSetEvents(events: RoyaltiesSet[]): void {
  events.forEach((event) => {
    handleRoyaltiesSet(event)
  })
}
