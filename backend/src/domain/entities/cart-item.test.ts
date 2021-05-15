import { CartItem } from './cart-item'
import * as faker from 'faker'

const TENANT_ID = faker.datatype.uuid()
const CART_ID = faker.datatype.uuid()

describe('Cart item entity tests', () => {
  it('Should not instantiate a cart item with an empty productId', () => {
    expect(() => {
      new CartItem(TENANT_ID, CART_ID, '', 1)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new CartItem(TENANT_ID, CART_ID, ' ', 1)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new CartItem(TENANT_ID, CART_ID, undefined, 1)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new CartItem(TENANT_ID, CART_ID, null, 1)
    }).toThrowError('invalid productId, must not be empty')
  })

  it('Should not instantiate a cart item with quantity less than 1', () => {
    expect(() => {
      new CartItem(TENANT_ID, CART_ID, faker.datatype.uuid(), 0)
    }).toThrowError('invalid quantity, must be greater than 0')

    expect(() => {
      new CartItem(TENANT_ID, CART_ID, faker.datatype.uuid(), -1)
    }).toThrowError('invalid quantity, must be greater than 0')
  })

  it('Should not instantiate a cart item with quantity greater than 10', () => {
    expect(() => {
      new CartItem(TENANT_ID, CART_ID, faker.datatype.uuid(), 100)
    }).toThrowError('invalid quantity, must be less than or equals 10')
  })

  
  it('Smoking test: Mandatory fields getters must return correct values and quantity must be updated successfully', () => {
    const productId = faker.datatype.uuid()
    const item = new CartItem(TENANT_ID, CART_ID, productId, 1)
    expect(item.getProductId()).toBe(productId)
    expect(item.getQuantity()).toBe(1)

    item.setQuantity(22)  
    expect(item.getQuantity()).toBe(22)
  })
})