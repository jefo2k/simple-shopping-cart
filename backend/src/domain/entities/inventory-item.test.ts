import { InventoryItem } from './inventory-item'

describe('Inventory item entity tests', () => {
  it('Should not instantiate an inventory item with an empty productId', () => {
    expect(() => {
      new InventoryItem('', 20)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new InventoryItem(' ', 20)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new InventoryItem(undefined, 20)
    }).toThrowError('invalid productId, must not be empty')

    expect(() => {
      new InventoryItem(null, 20)
    }).toThrowError('invalid productId, must not be empty')
  })

  it('Should not instantiate an inventory item with quantity less than 1', () => {
    expect(() => {
      new InventoryItem('productId1', 0)
    }).toThrowError('invalid quantity, must be greater than 0')

    expect(() => {
      new InventoryItem('productId1', -1)
    }).toThrowError('invalid quantity, must be greater than 0')
  })

  it('Should not instantiate an inventory item with quantity greater than 99', () => {
    expect(() => {
      new InventoryItem('productId1', 100)
    }).toThrowError('invalid quantity, must be less than or equals 99')
  })

  const item = new InventoryItem('productId1', 20)

  it('Smoking test: Mandatory fields getters must return correct values', () => {
    expect(item.getProductId()).toBe('productId1')
    expect(item.getQuantity()).toBe(20)
  })

  it('Smoking test: Setters must update values correctly', () => {
    item.setQuantity(22)
    
    expect(item.getQuantity()).toBe(22)
  })

})