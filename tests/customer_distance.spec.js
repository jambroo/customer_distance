'use strict'

const { customerDistance, processCustomerDistances } = require('../index')
const expect = require('chai').expect


describe('customer_distance tests', () => {
  describe('processCustomerDistances function', () => {
    it('should export a function', () => {
      expect(processCustomerDistances).to.be.a('function')
    })

    it('should process single entry (within 100km)', () => {
      let test_db = [{
        latitude: '54.0894797',
        user_id: 1,
        name: 'James Brooking',
        longitude: '-6.18671'
      }];
      expect(processCustomerDistances(test_db)).to.equal('1 James Brooking')
    })

    it('should ignore entries over 100km', () => {
      let test_db = [{
        latitude: '54.0894797',
        user_id: 1,
        name: 'James Brooking',
        longitude: '-6.18671'
      },
      { latitude: '51.92893',
        user_id: 2,
        name: 'John Smith',
        longitude: '-10.27699'
      }];
      expect(processCustomerDistances(test_db)).to.equal('1 James Brooking')
    })

    it('should sort results by user_id', () => {
      let test_db = [{
        latitude: '53.2451022',
        user_id: 4,
        name: 'Jane Doe',
        longitude: '-6.238335'
      },
      {
        latitude: '54.0894797',
        user_id: 1,
        name: 'James Brooking',
        longitude: '-6.18671'
      },
      { latitude: '51.92893',
        user_id: 2,
        name: 'John Smith',
        longitude: '-10.27699'
      }];
      expect(processCustomerDistances(test_db)).to.equal("1 James Brooking\n4 Jane Doe")
    })
  })
})
