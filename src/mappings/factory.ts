import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { Market, PropertyEntity, User } from '../../generated/schema' // entities
import { PropertyCreated } from '../../generated/PropertyFactory/PropertyFactory' // event
import { Property } from '../../generated/templates'
import { BD_0, BI_0, BI_1, concatFiltered } from './helpers'
import { SUBGRAPH_VERSION } from './config'

export function handlePropertyCreated(event: PropertyCreated): void {
  let timestamp = event.block.timestamp
  let txHash = event.transaction.hash
  let blockNumber = event.block.number

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

  // update / create owner as a User entity
  let owner = User.load(event.params.owner) as User | null
  if (!owner) {
    owner = new User(event.params.owner)
    owner.propertiesOwned = new Array<Bytes>()
    owner.ownerTransfersCount = BI_0
    owner.ownerTransferVolumeUSD = BD_0
    owner.ownerRoyaltiesVolumeUSD = BD_0
    owner.buyerPaidVolumeUSD = BD_0
    owner.brokerTransfersCount = BI_0
    owner.brokerTransferVolumeUSD = BD_0
    owner.brokerRoyaltiesVolumeUSD = BD_0
    owner.agentTransfersCount = BI_0
    owner.agentTransferVolumeUSD = BD_0
    owner.createdAtTimestamp = timestamp
    owner.createdAtBlockNumber = blockNumber

    // update global counters
    market.propertyOwnersCount = (market.propertyOwnersCount as BigInt).plus(BI_1)
    market.usersCount = (market.usersCount as BigInt).plus(BI_1)
  }
  owner.txHash = txHash
  owner.timestamp = timestamp

  // update / create broker as a User entity
  let broker = User.load(event.params.broker) as User | null
  if (!broker) {
    broker = new User(event.params.broker)
    broker.propertiesOwned = new Array<Bytes>()
    broker.ownerTransfersCount = BI_0
    broker.ownerTransferVolumeUSD = BD_0
    broker.ownerRoyaltiesVolumeUSD = BD_0
    broker.buyerPaidVolumeUSD = BD_0
    broker.brokerTransfersCount = BI_0
    broker.brokerTransferVolumeUSD = BD_0
    broker.brokerRoyaltiesVolumeUSD = BD_0
    broker.agentTransfersCount = BI_0
    broker.agentTransferVolumeUSD = BD_0
    broker.createdAtTimestamp = timestamp
    broker.createdAtBlockNumber = blockNumber

    // update global counter
    market.usersCount = (market.usersCount as BigInt).plus(BI_1)
  }
  broker.txHash = txHash
  broker.timestamp = timestamp

  // update / create agent as a User entity
  let agent = User.load(event.params.agent) as User | null
  if (!agent) {
    agent = new User(event.params.agent)
    agent.propertiesOwned = new Array<Bytes>()
    agent.ownerTransfersCount = BI_0
    agent.ownerTransferVolumeUSD = BD_0
    agent.ownerRoyaltiesVolumeUSD = BD_0
    agent.buyerPaidVolumeUSD = BD_0
    agent.brokerTransfersCount = BI_0
    agent.brokerTransferVolumeUSD = BD_0
    agent.brokerRoyaltiesVolumeUSD = BD_0
    agent.agentTransfersCount = BI_0
    agent.agentTransferVolumeUSD = BD_0
    agent.createdAtTimestamp = timestamp
    agent.createdAtBlockNumber = blockNumber

    // update global counter
    market.usersCount = (market.usersCount as BigInt).plus(BI_1)
  }
  agent.txHash = txHash
  agent.timestamp = timestamp

  // update / create property entity
  let property = PropertyEntity.load(event.params.property) as PropertyEntity | null
  if (!property) {
    property = new PropertyEntity(event.params.property)
    property.askings = new Array<Bytes>()
    property.offerings = new Array<Bytes>()
    property.ownerRoyaltiesDistributedUSD = BD_0
    property.ownerRoyaltiesDistributedUSD = BD_0
    property.ownerRoyaltiesDistributedUSD = BD_0
    property.brokerRoyaltiesDistributedUSD = BD_0
    property.providerRoyaltiesDistributedUSD = BD_0
    property.createdAtTimestamp = timestamp
    property.createdAtBlockNumber = blockNumber

    // update global counter
    market.propertiesCount = (market.propertiesCount as BigInt).plus(BI_1)
  }
  property.streetAddress = event.params.streetAddress
  property.legalDescription = event.params.legalDescription
  property.documentationURI = event.params.documentationURI
  property.owner = owner.id
  property.broker = event.params.broker
  property.transferAgent = event.params.agent
  property.ownerRoyaltiesBps = event.params.ownerRoyalties
  property.brokerRoyaltiesBps = event.params.brokerRoyalties
  property.providerRoyaltiesBps = event.params.providerRoyalties
  property.txHash = txHash
  property.timestamp = timestamp

  // connect Property and Owner
  owner.propertiesOwned = concatFiltered(owner.propertiesOwned as Array<Bytes>, [property.id])

  // create a new dataSource based on the template to track all other events
  Property.create(event.params.property)

  // save entities
  market.save()
  owner.save()
  broker.save()
  agent.save()
  property.save()
}
