import { InventoryItem } from './inventory-item'
import * as faker from 'faker'

const TENANT_ID = faker.datatype.uuid()

describe('Inventory item entity tests', () => {
  it('Should not instantiate an inventory item with an empty productId', () => {
    expect(() => {
      new InventoryItem(TENANT_ID, '', 20)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new InventoryItem(TENANT_ID, ' ', 20)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new InventoryItem(TENANT_ID, undefined, 20)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new InventoryItem(TENANT_ID, null, 20)
    }).toThrowError('invalid productId, must not be empty')
  })

  it('Should not instantiate an inventory item with quantity less than 1', () => {
    expect(() => {
      new InventoryItem(TENANT_ID, faker.datatype.uuid(), 0)
    }).toThrowError('invalid quantity, must be greater than 0')

    expect(() => {
      new InventoryItem(TENANT_ID, faker.datatype.uuid(), -1)
    }).toThrowError('invalid quantity, must be greater than 0')
  })

  it('Should not instantiate an inventory item with quantity greater than 99', () => {
    expect(() => {
      new InventoryItem(TENANT_ID, faker.datatype.uuid(), 100)
    }).toThrowError('invalid quantity, must be less than or equals 99')
  })

  
  it('Smoking test: Mandatory fields getters must return correct values and quantity must be updated successfully', () => {
    const productId = faker.datatype.uuid()
    const item = new InventoryItem(TENANT_ID, productId, 20)
    expect(item.getProductId()).toBe(productId)
    expect(item.getQuantity()).toBe(20)

    item.setQuantity(22)  
    expect(item.getQuantity()).toBe(22)
  })
})