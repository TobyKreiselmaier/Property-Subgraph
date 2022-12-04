import { Bytes } from '@graphprotocol/graph-ts'
import { afterEach, assert, beforeEach, clearStore, describe, test } from 'matchstick-as'
import { Market, PropertyEntity, User } from '../generated/schema' // entities
import { createPropertyCreatedEvent, handleNewPropertyCreatedEvents } from './utils'
import {
  ACCOUNT_1,
  ACCOUNT_2,
  ACCOUNT_3,
  ACCOUNT_4,
  ADDRESS_1,
  ADDRESS_2,
  ADDRESS_3,
  ADDRESS_4,
  BD_MEDIUM_TEST_VALUE,
  BD_SMALL_TEST_VALUE,
  BI_100,
  BI_3,
  BI_50,
  BI_MEDIUM_TEST_VALUE,
  BI_SMALL_TEST_VALUE,
  DOCUMENTATION_URI,
  LEGAL_DESCRIPTION,
  mockHash,
  ONE,
  STREET_ADDRESS
} from './testValues'
import { SUBGRAPH_VERSION } from '../src/mappings/config'
import { BD_0, BI_0, BI_1 } from '../src/mappings/helpers'

describe('Testing All Entities When Manually Created for Correct Field Values in Alphabetical Order', () => {
  test('Market', () => {
    // Initialize a test Market entity
    let market = new Market(Bytes.fromHexString(ONE))
    market.propertyOwnersCount = BI_SMALL_TEST_VALUE
    market.usersCount = BI_MEDIUM_TEST_VALUE
    market.propertiesCount = BI_SMALL_TEST_VALUE
    market.transfersCount = BI_3
    market.transferVolumeUSD = BD_MEDIUM_TEST_VALUE
    market.ownerRoyaltiesDistributedUSD = BD_SMALL_TEST_VALUE
    market.brokerRoyaltiesDistributedUSD = BD_SMALL_TEST_VALUE
    market.providerRoyaltiesDistributedUSD = BD_SMALL_TEST_VALUE
    market.subgraphVersion = SUBGRAPH_VERSION
    market.save()

    // check values for manually created test entity
    assert.fieldEquals('Market', ONE, 'id', ONE)
    assert.fieldEquals('Market', ONE, 'propertyOwnersCount', BI_SMALL_TEST_VALUE.toString())
    assert.fieldEquals('Market', ONE, 'usersCount', BI_MEDIUM_TEST_VALUE.toString())
    assert.fieldEquals('Market', ONE, 'propertiesCount', BI_SMALL_TEST_VALUE.toString())
    assert.fieldEquals('Market', ONE, 'transfersCount', '3')
    assert.fieldEquals('Market', ONE, 'transferVolumeUSD', BD_MEDIUM_TEST_VALUE.toString())
    assert.fieldEquals(
      'Market',
      ONE,
      'ownerRoyaltiesDistributedUSD',
      BD_SMALL_TEST_VALUE.toString()
    )
    assert.fieldEquals(
      'Market',
      ONE,
      'brokerRoyaltiesDistributedUSD',
      BD_SMALL_TEST_VALUE.toString()
    )
    assert.fieldEquals(
      'Market',
      ONE,
      'providerRoyaltiesDistributedUSD',
      BD_SMALL_TEST_VALUE.toString()
    )
    assert.fieldEquals('Market', ONE, 'subgraphVersion', SUBGRAPH_VERSION)
  })

  test('PropertyEntity', () => {
    // Initialize a test PropertyEntity entity
    let property = new PropertyEntity(Bytes.fromHexString(ACCOUNT_1))
    property.streetAddress = STREET_ADDRESS
    property.legalDescription = LEGAL_DESCRIPTION
    property.documentationURI = DOCUMENTATION_URI
    property.owner = ADDRESS_2
    property.broker = ADDRESS_3
    property.transferAgent = ADDRESS_4
    property.ownerRoyaltiesBps = BI_100
    property.brokerRoyaltiesBps = BI_100
    property.providerRoyaltiesBps = BI_50
    property.askings = new Array<Bytes>()
    property.offerings = new Array<Bytes>()
    property.ownerRoyaltiesDistributedUSD = BD_SMALL_TEST_VALUE
    property.brokerRoyaltiesDistributedUSD = BD_SMALL_TEST_VALUE
    property.providerRoyaltiesDistributedUSD = BD_SMALL_TEST_VALUE
    property.createdAtBlockNumber = BI_SMALL_TEST_VALUE
    property.createdAtTimestamp = BI_MEDIUM_TEST_VALUE
    property.txHash = Bytes.fromHexString(mockHash)
    property.timestamp = BI_MEDIUM_TEST_VALUE
    property.save()

    // check values for manually created test entity
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'id', ACCOUNT_1)
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'streetAddress', STREET_ADDRESS)
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'legalDescription', LEGAL_DESCRIPTION)
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'documentationURI', DOCUMENTATION_URI)
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'owner', ACCOUNT_2)
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'broker', ACCOUNT_3)
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'transferAgent', ACCOUNT_4)
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'ownerRoyaltiesBps', '100')
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'brokerRoyaltiesBps', '100')
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'providerRoyaltiesBps', '50')
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'askings', '[]')
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'offerings', '[]')
    assert.fieldEquals(
      'PropertyEntity',
      ACCOUNT_1,
      'ownerRoyaltiesDistributedUSD',
      BD_SMALL_TEST_VALUE.toString()
    )
    assert.fieldEquals(
      'PropertyEntity',
      ACCOUNT_1,
      'brokerRoyaltiesDistributedUSD',
      BD_SMALL_TEST_VALUE.toString()
    )
    assert.fieldEquals(
      'PropertyEntity',
      ACCOUNT_1,
      'providerRoyaltiesDistributedUSD',
      BD_SMALL_TEST_VALUE.toString()
    )
    assert.fieldEquals(
      'PropertyEntity',
      ACCOUNT_1,
      'createdAtBlockNumber',
      BI_SMALL_TEST_VALUE.toString()
    )
    assert.fieldEquals(
      'PropertyEntity',
      ACCOUNT_1,
      'createdAtTimestamp',
      BI_MEDIUM_TEST_VALUE.toString()
    )
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'txHash', mockHash)
    assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'timestamp', BI_MEDIUM_TEST_VALUE.toString())
  })

  test('User', () => {
    // Initialize a test User entity
    let user = new User(Bytes.fromHexString(ACCOUNT_2))
    user.propertiesOwned = new Array<Bytes>()
    user.ownerTransfersCount = BI_1
    user.ownerTransferVolumeUSD = BD_MEDIUM_TEST_VALUE
    user.ownerRoyaltiesVolumeUSD = BD_SMALL_TEST_VALUE
    user.buyerPaidVolumeUSD = BD_MEDIUM_TEST_VALUE
    user.brokerTransfersCount = BI_0
    user.brokerTransferVolumeUSD = BD_0
    user.brokerRoyaltiesVolumeUSD = BD_0
    user.agentTransfersCount = BI_0
    user.agentTransferVolumeUSD = BD_0
    user.createdAtBlockNumber = BI_SMALL_TEST_VALUE
    user.createdAtTimestamp = BI_MEDIUM_TEST_VALUE
    user.txHash = Bytes.fromHexString(mockHash)
    user.timestamp = BI_MEDIUM_TEST_VALUE
    user.save()

    // check values for manually created test entity
    assert.fieldEquals('User', ACCOUNT_2, 'id', ACCOUNT_2)
    assert.fieldEquals('User', ACCOUNT_2, 'ownerTransfersCount', '1')
    assert.fieldEquals('User', ACCOUNT_2, 'ownerTransferVolumeUSD', BD_MEDIUM_TEST_VALUE.toString())
    assert.fieldEquals('User', ACCOUNT_2, 'ownerRoyaltiesVolumeUSD', BD_SMALL_TEST_VALUE.toString())
    assert.fieldEquals('User', ACCOUNT_2, 'buyerPaidVolumeUSD', BD_MEDIUM_TEST_VALUE.toString())
    assert.fieldEquals('User', ACCOUNT_2, 'brokerTransfersCount', '0')
    assert.fieldEquals('User', ACCOUNT_2, 'brokerTransferVolumeUSD', '0')
    assert.fieldEquals('User', ACCOUNT_2, 'brokerRoyaltiesVolumeUSD', '0')
    assert.fieldEquals('User', ACCOUNT_2, 'agentTransfersCount', '0')
    assert.fieldEquals('User', ACCOUNT_2, 'agentTransferVolumeUSD', '0')
    assert.fieldEquals('User', ACCOUNT_2, 'createdAtBlockNumber', BI_SMALL_TEST_VALUE.toString())
    assert.fieldEquals('User', ACCOUNT_2, 'createdAtTimestamp', BI_MEDIUM_TEST_VALUE.toString())
    assert.fieldEquals('User', ACCOUNT_2, 'txHash', mockHash)
    assert.fieldEquals('User', ACCOUNT_2, 'timestamp', BI_MEDIUM_TEST_VALUE.toString())
  })
})

describe('Testing Each Entity Created or Modified by Test Events under a Mocked Environment in Order of Appearance in the Handler', () => {
  describe('handlePropertyCreated()', () => {
    beforeEach(() => {
      // create a test entity via a test event
      let propertyCreatedTestEvent = createPropertyCreatedEvent(
        ADDRESS_1, // property
        STREET_ADDRESS,
        LEGAL_DESCRIPTION,
        DOCUMENTATION_URI,
        ADDRESS_2, // owner
        ADDRESS_3, // broker
        ADDRESS_4, // agent
        BI_100, // ownerRoyalties
        BI_100, // brokerRoyalties
        BI_50 // providerRoyalties
      )
      handleNewPropertyCreatedEvents([propertyCreatedTestEvent])
    })

    test('Market', () => {
      // check values for the entity created by the test event
      assert.fieldEquals('Market', ONE, 'id', ONE)
      assert.fieldEquals('Market', ONE, 'propertyOwnersCount', '1')
      assert.fieldEquals('Market', ONE, 'usersCount', '3')
      assert.fieldEquals('Market', ONE, 'propertiesCount', '1')
      assert.fieldEquals('Market', ONE, 'transfersCount', '0')
      assert.fieldEquals('Market', ONE, 'transferVolumeUSD', '0')
      assert.fieldEquals('Market', ONE, 'ownerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('Market', ONE, 'brokerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('Market', ONE, 'providerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('Market', ONE, 'subgraphVersion', SUBGRAPH_VERSION)
    })

    test('PropertyEntity', () => {
      // check values for the entity created by the test event
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'id', ACCOUNT_1)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'streetAddress', STREET_ADDRESS)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'legalDescription', LEGAL_DESCRIPTION)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'documentationURI', DOCUMENTATION_URI)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'owner', ACCOUNT_2)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'broker', ACCOUNT_3)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'transferAgent', ACCOUNT_4)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'ownerRoyaltiesBps', '100')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'brokerRoyaltiesBps', '100')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'providerRoyaltiesBps', '50')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'askings', '[]')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'offerings', '[]')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'ownerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'brokerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'providerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'createdAtBlockNumber', '1')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'createdAtTimestamp', '1')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'txHash', mockHash)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'timestamp', '1')
    })

    test('User', () => {
      // check values for the entity created by the test event
      // owner
      assert.fieldEquals('User', ACCOUNT_2, 'id', ACCOUNT_2)
      assert.fieldEquals('User', ACCOUNT_2, 'propertiesOwned', '['.concat(ACCOUNT_1).concat(']'))
      assert.fieldEquals('User', ACCOUNT_2, 'ownerTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'ownerTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'ownerRoyaltiesVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'buyerPaidVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'brokerTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'brokerTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'brokerRoyaltiesVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'agentTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'agentTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_2, 'createdAtBlockNumber', '1')
      assert.fieldEquals('User', ACCOUNT_2, 'createdAtTimestamp', '1')
      assert.fieldEquals('User', ACCOUNT_2, 'txHash', mockHash)
      assert.fieldEquals('User', ACCOUNT_2, 'timestamp', '1')

      // broker
      assert.fieldEquals('User', ACCOUNT_3, 'id', ACCOUNT_3)
      assert.fieldEquals('User', ACCOUNT_3, 'propertiesOwned', '[]')
      assert.fieldEquals('User', ACCOUNT_3, 'ownerTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'ownerTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'ownerRoyaltiesVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'buyerPaidVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'brokerTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'brokerTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'brokerRoyaltiesVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'agentTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'agentTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'createdAtBlockNumber', '1')
      assert.fieldEquals('User', ACCOUNT_3, 'createdAtTimestamp', '1')
      assert.fieldEquals('User', ACCOUNT_3, 'txHash', mockHash)
      assert.fieldEquals('User', ACCOUNT_3, 'timestamp', '1')

      // agent
      assert.fieldEquals('User', ACCOUNT_4, 'id', ACCOUNT_4)
      assert.fieldEquals('User', ACCOUNT_4, 'propertiesOwned', '[]')
      assert.fieldEquals('User', ACCOUNT_4, 'ownerTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'ownerTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'ownerRoyaltiesVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'buyerPaidVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'brokerTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'brokerTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'brokerRoyaltiesVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'agentTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'agentTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_4, 'createdAtBlockNumber', '1')
      assert.fieldEquals('User', ACCOUNT_4, 'createdAtTimestamp', '1')
      assert.fieldEquals('User', ACCOUNT_4, 'txHash', mockHash)
      assert.fieldEquals('User', ACCOUNT_4, 'timestamp', '1')
    })
  })
})

afterEach(() => {
  clearStore()
})
