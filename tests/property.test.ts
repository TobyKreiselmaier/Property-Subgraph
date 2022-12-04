import { Address, Bytes } from '@graphprotocol/graph-ts'
import { afterEach, assert, beforeEach, clearStore, describe, test } from 'matchstick-as'
import { Asking, Market, Offering, PropertyEntity, User } from '../generated/schema' // entities
import {
  createAskingPriceUpdateEvent,
  createClosingTableEvent,
  createOfferUpdateEvent,
  createPropertyCreatedEvent,
  createRoyaltiesPaidEvent,
  createRoyaltiesSetEvent,
  handleNewAskingPriceUpdateEvents,
  handleNewClosingTableEvents,
  handleNewOfferUpdateEvents,
  handleNewPropertyCreatedEvents,
  handleNewRoyaltiesPaidEvents,
  handleNewRoyaltiesSetEvents
} from './utils'
import {
  ACCOUNT_1,
  ACCOUNT_2,
  ACCOUNT_3,
  ACCOUNT_4,
  ACCOUNT_5,
  ADDRESS_1,
  ADDRESS_2,
  ADDRESS_3,
  ADDRESS_4,
  ADDRESS_5,
  BD_MEDIUM_TEST_VALUE,
  BD_SMALL_TEST_VALUE,
  BI_100,
  BI_3,
  BI_50,
  BI_MEDIUM_TEST_VALUE,
  BI_SMALL_TEST_VALUE,
  BI_LARGE_TEST_VALUE,
  DOCUMENTATION_URI,
  ONE,
  LEGAL_DESCRIPTION,
  mockHash,
  STREET_ADDRESS,
  ZERO
} from './testValues'
import { BROKER, OWNER, PROVIDER, SUBGRAPH_VERSION } from '../src/mappings/config'
import { BD_0, BI_0, BI_1, convertAmountToBigDecimal } from '../src/mappings/helpers'
import { getCoinUsdPrice } from '../src/mappings/pricing'

describe('Testing All Entities When Manually Created for Correct Field Values in Alphabetical Order', () => {
  test('Asking', () => {
    // Initialize a test Asking entity
    let asking = new Asking(Bytes.fromHexString(ONE))
    asking.property = ADDRESS_1
    asking.owner = ADDRESS_2
    asking.tokenAddress = Address.zero()
    asking.value = BI_MEDIUM_TEST_VALUE
    asking.txHash = Bytes.fromHexString(mockHash)
    asking.timestamp = BI_MEDIUM_TEST_VALUE
    asking.save()

    // check values for manually created test entity
    assert.fieldEquals('Asking', ONE, 'id', ONE)
    assert.fieldEquals('Asking', ONE, 'property', ACCOUNT_1)
    assert.fieldEquals('Asking', ONE, 'owner', ACCOUNT_2)
    assert.fieldEquals('Asking', ONE, 'tokenAddress', ZERO)
    assert.fieldEquals('Asking', ONE, 'value', BI_MEDIUM_TEST_VALUE.toString())
    assert.fieldEquals('Asking', ONE, 'txHash', mockHash)
    assert.fieldEquals('Asking', ONE, 'timestamp', BI_MEDIUM_TEST_VALUE.toString())
  })

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

  test('Offering', () => {
    // Initialize a test Offering entity
    let offering = new Offering(Bytes.fromHexString(ONE))
    offering.property = ADDRESS_1
    offering.bidder = ADDRESS_5
    offering.tokenAddress = Address.zero()
    offering.value = BI_MEDIUM_TEST_VALUE
    offering.txHash = Bytes.fromHexString(mockHash)
    offering.timestamp = BI_MEDIUM_TEST_VALUE
    offering.save()

    // check values for manually created test entity
    assert.fieldEquals('Offering', ONE, 'id', ONE)
    assert.fieldEquals('Offering', ONE, 'property', ACCOUNT_1)
    assert.fieldEquals('Offering', ONE, 'bidder', ACCOUNT_5)
    assert.fieldEquals('Offering', ONE, 'tokenAddress', ZERO)
    assert.fieldEquals('Offering', ONE, 'value', BI_MEDIUM_TEST_VALUE.toString())
    assert.fieldEquals('Offering', ONE, 'txHash', mockHash)
    assert.fieldEquals('Offering', ONE, 'timestamp', BI_MEDIUM_TEST_VALUE.toString())
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
  describe('handleAskingPriceUpdate()', () => {
    beforeEach(() => {
      // used to create a mock Market, Property, and Owner entites
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

      // create a test entity via a test event
      let askingPriceUpdateEvent = createAskingPriceUpdateEvent(
        Address.zero(), // token
        BI_LARGE_TEST_VALUE // value
      )

      // set sender address for the event
      askingPriceUpdateEvent.address = ADDRESS_1

      handleNewAskingPriceUpdateEvents([askingPriceUpdateEvent])
    })

    test('Asking', () => {
      let id = ACCOUNT_1.concat('00').concat(ZERO.slice(2))

      // check values for test entity created by test event
      assert.fieldEquals('Asking', id, 'id', id)
      assert.fieldEquals('Asking', id, 'property', ACCOUNT_1)
      assert.fieldEquals('Asking', id, 'owner', ACCOUNT_2)
      assert.fieldEquals('Asking', id, 'tokenAddress', ZERO)
      assert.fieldEquals('Asking', id, 'value', BI_LARGE_TEST_VALUE.toString())
      assert.fieldEquals('Asking', id, 'txHash', mockHash)
      assert.fieldEquals('Asking', id, 'timestamp', '1')
    })

    test('PropertyEntity', () => {
      // check that property entity is connected to the Asking entity
      assert.fieldEquals(
        'PropertyEntity',
        ACCOUNT_1,
        'askings',
        '['.concat(ACCOUNT_1.concat('00').concat(ZERO.slice(2))).concat(']')
      )
    })
  })

  describe('handleOfferUpdate()', () => {
    beforeEach(() => {
      // used to create mock Market, Property, and Owner entities
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

      // used to create a mock Asking entity
      let askingPriceUpdateEvent = createAskingPriceUpdateEvent(
        Address.zero(), // token
        BI_LARGE_TEST_VALUE // value
      )

      // set sender address for the event
      askingPriceUpdateEvent.address = ADDRESS_1

      handleNewAskingPriceUpdateEvents([askingPriceUpdateEvent])

      // used to create the Offering test entity
      let offerUpdateEvent = createOfferUpdateEvent(
        ADDRESS_5, // bidder
        Address.zero(), // token
        BI_LARGE_TEST_VALUE // value
      )

      // set sender address for the event
      offerUpdateEvent.address = ADDRESS_1

      handleNewOfferUpdateEvents([offerUpdateEvent])
    })

    test('Offering', () => {
      let id = ACCOUNT_1.concat('00').concat(ZERO.slice(2)).concat('00').concat(ACCOUNT_5.slice(2))
      // check values for test entity created by test event
      assert.fieldEquals('Offering', id, 'id', id)
      assert.fieldEquals('Offering', id, 'property', ACCOUNT_1)
      assert.fieldEquals('Offering', id, 'bidder', ACCOUNT_5)
      assert.fieldEquals('Offering', id, 'tokenAddress', ZERO)
      assert.fieldEquals('Offering', id, 'value', BI_LARGE_TEST_VALUE.toString())
      assert.fieldEquals('Offering', id, 'txHash', mockHash)
      assert.fieldEquals('Offering', id, 'timestamp', '1')
    })

    test('PropertyEntity', () => {
      // check that property entity is connected to the Offering entity
      assert.fieldEquals(
        'PropertyEntity',
        ACCOUNT_1,
        'offerings',
        '['
          .concat(
            ACCOUNT_1.concat('00').concat(ZERO.slice(2)).concat('00').concat(ACCOUNT_5.slice(2))
          )
          .concat(']')
      )
    })
  })

  describe('handleClosingTable()', () => {
    beforeEach(() => {
      // used to create mock Market, Property, and Owner entities
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

      // used to create a mock Asking entity
      let askingPriceUpdateEvent = createAskingPriceUpdateEvent(
        Address.zero(), // token
        BI_LARGE_TEST_VALUE // value
      )

      // set sender address for the event
      askingPriceUpdateEvent.address = ADDRESS_1

      handleNewAskingPriceUpdateEvents([askingPriceUpdateEvent])

      // used to create mock Offering entity
      let offerUpdateEvent = createOfferUpdateEvent(
        ADDRESS_5, // bidder
        Address.zero(), // token
        BI_LARGE_TEST_VALUE // value
      )

      // set sender address for the event
      offerUpdateEvent.address = ADDRESS_1

      handleNewOfferUpdateEvents([offerUpdateEvent])

      // used to create mock Offering entity
      let closingTableEvent = createClosingTableEvent(
        ADDRESS_2, // seller
        ADDRESS_5, // buyer
        Address.zero(), // token
        BI_MEDIUM_TEST_VALUE, // received
        BI_LARGE_TEST_VALUE // paid
      )

      // set sender address for the event
      closingTableEvent.address = ADDRESS_1

      handleNewClosingTableEvents([closingTableEvent])
    })

    test('Market', () => {
      // check values for entity created & modified by test events
      assert.fieldEquals('Market', ONE, 'id', ONE)
      assert.fieldEquals('Market', ONE, 'propertyOwnersCount', '1')
      assert.fieldEquals('Market', ONE, 'usersCount', '4')
      assert.fieldEquals('Market', ONE, 'propertiesCount', '1')
      assert.fieldEquals('Market', ONE, 'transfersCount', '1')
      assert.fieldEquals(
        'Market',
        ONE,
        'transferVolumeUSD',
        convertAmountToBigDecimal(BI_LARGE_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
      assert.fieldEquals('Market', ONE, 'ownerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('Market', ONE, 'brokerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('Market', ONE, 'providerRoyaltiesDistributedUSD', '0')
      assert.fieldEquals('Market', ONE, 'subgraphVersion', SUBGRAPH_VERSION)
    })

    test('PropertyEntity', () => {
      // check values for test entity modified by test events
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'id', ACCOUNT_1)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'streetAddress', STREET_ADDRESS)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'legalDescription', LEGAL_DESCRIPTION)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'documentationURI', DOCUMENTATION_URI)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'owner', ACCOUNT_5)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'broker', ZERO)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'transferAgent', ZERO)
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
      // check values for the seller modified by test events
      assert.fieldEquals('User', ACCOUNT_2, 'id', ACCOUNT_2)
      assert.fieldEquals('User', ACCOUNT_2, 'ownerTransfersCount', '1')
      assert.fieldEquals(
        'User',
        ACCOUNT_2,
        'ownerTransferVolumeUSD',
        convertAmountToBigDecimal(BI_MEDIUM_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
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

      // check values for the buyer modified by test events
      assert.fieldEquals('User', ACCOUNT_5, 'id', ACCOUNT_5)
      assert.fieldEquals('User', ACCOUNT_5, 'ownerTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_5, 'ownerTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_5, 'ownerRoyaltiesVolumeUSD', '0')
      assert.fieldEquals(
        'User',
        ACCOUNT_5,
        'buyerPaidVolumeUSD',
        convertAmountToBigDecimal(BI_LARGE_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
      assert.fieldEquals('User', ACCOUNT_5, 'brokerTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_5, 'brokerTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_5, 'brokerRoyaltiesVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_5, 'agentTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_5, 'agentTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_5, 'createdAtBlockNumber', '1')
      assert.fieldEquals('User', ACCOUNT_5, 'createdAtTimestamp', '1')
      assert.fieldEquals('User', ACCOUNT_5, 'txHash', mockHash)
      assert.fieldEquals('User', ACCOUNT_5, 'timestamp', '1')
    })
  })

  describe('handleRoyaltiesSet()', () => {
    beforeEach(() => {
      // used to create mock Market, Property, and Owner entities
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

      // modify the property mock entity
      let royaltiesSetTestEvent1 = createRoyaltiesSetEvent(
        ADDRESS_2, // beneficiary
        BI_50, // value
        Bytes.fromHexString(OWNER) // role
      )

      let royaltiesSetTestEvent2 = createRoyaltiesSetEvent(
        ADDRESS_3, // beneficiary
        BI_50, // value
        Bytes.fromHexString(BROKER) // role
      )

      let royaltiesSetTestEvent3 = createRoyaltiesSetEvent(
        ADDRESS_4, // beneficiary
        BI_100, // value
        Bytes.fromHexString(PROVIDER) // role
      )

      // set sender address for the events
      royaltiesSetTestEvent1.address = ADDRESS_1
      royaltiesSetTestEvent2.address = ADDRESS_1
      royaltiesSetTestEvent3.address = ADDRESS_1

      handleNewRoyaltiesSetEvents([
        royaltiesSetTestEvent1,
        royaltiesSetTestEvent2,
        royaltiesSetTestEvent3
      ])
    })

    test('PropertyEntity', () => {
      // check values for test entity modified by test events
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'id', ACCOUNT_1)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'streetAddress', STREET_ADDRESS)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'legalDescription', LEGAL_DESCRIPTION)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'documentationURI', DOCUMENTATION_URI)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'owner', ACCOUNT_2)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'broker', ACCOUNT_3)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'transferAgent', ACCOUNT_4)
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'ownerRoyaltiesBps', '50')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'brokerRoyaltiesBps', '50')
      assert.fieldEquals('PropertyEntity', ACCOUNT_1, 'providerRoyaltiesBps', '100')
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
  })

  describe('handleRoyaltiesPaid()', () => {
    beforeEach(() => {
      // create mock Market, Property, and User entities to be modified by the event
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

      let royaltiesPaidTestEvent1 = createRoyaltiesPaidEvent(
        ADDRESS_2, // beneficiary
        Address.zero(), // token
        BI_SMALL_TEST_VALUE, // value
        Bytes.fromHexString(OWNER) // role
      )

      let royaltiesPaidTestEvent2 = createRoyaltiesPaidEvent(
        ADDRESS_3, // beneficiary
        Address.zero(), // token
        BI_SMALL_TEST_VALUE, // value
        Bytes.fromHexString(BROKER) // role
      )

      let royaltiesPaidTestEvent3 = createRoyaltiesPaidEvent(
        ADDRESS_4, // beneficiary
        Address.zero(), // token
        BI_SMALL_TEST_VALUE, // value
        Bytes.fromHexString(PROVIDER) // role
      )

      // set sender address for the events
      royaltiesPaidTestEvent1.address = ADDRESS_1
      royaltiesPaidTestEvent2.address = ADDRESS_1
      royaltiesPaidTestEvent3.address = ADDRESS_1

      handleNewRoyaltiesPaidEvents([
        royaltiesPaidTestEvent1,
        royaltiesPaidTestEvent2,
        royaltiesPaidTestEvent3
      ])
    })

    test('Market', () => {
      // check values for the entity created by the test event
      assert.fieldEquals('Market', ONE, 'id', ONE)
      assert.fieldEquals('Market', ONE, 'propertyOwnersCount', '1')
      assert.fieldEquals('Market', ONE, 'usersCount', '3')
      assert.fieldEquals('Market', ONE, 'propertiesCount', '1')
      assert.fieldEquals('Market', ONE, 'transfersCount', '0')
      assert.fieldEquals('Market', ONE, 'transferVolumeUSD', '0')
      assert.fieldEquals(
        'Market',
        ONE,
        'ownerRoyaltiesDistributedUSD',
        convertAmountToBigDecimal(BI_SMALL_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
      assert.fieldEquals(
        'Market',
        ONE,
        'brokerRoyaltiesDistributedUSD',
        convertAmountToBigDecimal(BI_SMALL_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
      assert.fieldEquals(
        'Market',
        ONE,
        'providerRoyaltiesDistributedUSD',
        convertAmountToBigDecimal(BI_SMALL_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
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
      assert.fieldEquals(
        'PropertyEntity',
        ACCOUNT_1,
        'ownerRoyaltiesDistributedUSD',
        convertAmountToBigDecimal(BI_SMALL_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
      assert.fieldEquals(
        'PropertyEntity',
        ACCOUNT_1,
        'brokerRoyaltiesDistributedUSD',
        convertAmountToBigDecimal(BI_SMALL_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
      assert.fieldEquals(
        'PropertyEntity',
        ACCOUNT_1,
        'providerRoyaltiesDistributedUSD',
        convertAmountToBigDecimal(BI_SMALL_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
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
      assert.fieldEquals(
        'User',
        ACCOUNT_2,
        'ownerRoyaltiesVolumeUSD',
        convertAmountToBigDecimal(BI_SMALL_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
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
      assert.fieldEquals(
        'User',
        ACCOUNT_3,
        'brokerRoyaltiesVolumeUSD',
        convertAmountToBigDecimal(BI_SMALL_TEST_VALUE, Address.zero())
          .times(getCoinUsdPrice())
          .toString()
      )
      assert.fieldEquals('User', ACCOUNT_3, 'agentTransfersCount', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'agentTransferVolumeUSD', '0')
      assert.fieldEquals('User', ACCOUNT_3, 'createdAtBlockNumber', '1')
      assert.fieldEquals('User', ACCOUNT_3, 'createdAtTimestamp', '1')
      assert.fieldEquals('User', ACCOUNT_3, 'txHash', mockHash)
      assert.fieldEquals('User', ACCOUNT_3, 'timestamp', '1')
    })
  })
})

afterEach(() => {
  clearStore()
})
