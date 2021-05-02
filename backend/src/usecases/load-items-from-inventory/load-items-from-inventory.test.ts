import { LoadItemsFromInventory } from './load-items-from-inventory'
import { InMemoryInventoryStore } from '../../data/in-memory-inventory-store'
import { InMemoryProductStore } from '../../data/in-memory-product-store'
import * as faker from 'faker'
import { Product, InventoryItem } from '../../domain/entities'

describe('Load items from inventory usecase tests', () => {
  
  it('should not load inventory on init', () => {
    const inventoryStore = new InMemoryInventoryStore()
    new LoadItemsFromInventory(inventoryStore)

    expect(inventoryStore.addCallsCount).toBe(0)
  })

  it('should load all items from inventory', async () => {
    const productStore = new InMemoryProductStore()
    const product1 = new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription())
    const product2 = new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription())
    const product3 = new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription())
    productStore.save(product1)
    productStore.save(product2)
    productStore.save(product3)

    const inventoryStore = new InMemoryInventoryStore()
    const item1 = new InventoryItem(product1.getId(), faker.datatype.number(99))
    const item2 = new InventoryItem(product2.getId(), faker.datatype.number(99))
    const item3 = new InventoryItem(product3.getId(), faker.datatype.number(99))
    inventoryStore.save(item1)
    inventoryStore.save(item2)
    inventoryStore.save(item3)

    const sut = new LoadItemsFromInventory(inventoryStore)
    const inventoryItemList = await sut.load()

    expect(inventoryStore.addCallsCount).toBe(3)
    expect(inventoryItemList).toHaveLength(3)
  })

  it('should return an empty list if there is no items in inventory', async () => {
    const inventoryStore = new InMemoryInventoryStore()
    
    const sut = new LoadItemsFromInventory(inventoryStore)
    const inventoryItemList = await sut.load()

    expect(inventoryStore.addCallsCount).toBe(0)
    expect(inventoryItemList).toHaveLength(0)
  })

})