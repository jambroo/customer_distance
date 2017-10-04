'use strict'

const customer_distance = require('../index')
const expect = require('chai').expect


describe('customer_distance function', () => {
  it('should export a function', () => {
    expect(customer_distance).to.be.a('function')
  })
})
