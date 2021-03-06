import { LoadItemsFromInventory } from './load-items-from-inventory'
import { InMemoryInventoryStore } from '../../data/in-memory/in-memory-inventory-store'
import { InMemoryProductStore } from '../../data/in-memory/in-memory-product-store'
import * as faker from 'faker'
import { Product, InventoryItem } from '../../domain/entities'

const TENANT_ID = faker.datatype.uuid()

describe('Load items from inventory usecase tests', () => {
  
  it('should not load inventory on init', () => {
    const inventoryStore = new InMemoryInventoryStore()
    new LoadItemsFromInventory(inventoryStore)

    expect(inventoryStore.addCallsCount).toBe(0)
  })

  it('should load all items from inventory', async () => {
    const productStore = new InMemoryProductStore()
    const product1 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product2 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product3 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await productStore.save(product1)
    await productStore.save(product2)
    await productStore.save(product3)

    const inventoryStore = new InMemoryInventoryStore()
    const item1 = new InventoryItem(TENANT_ID, product1.getProductId(), 1 + faker.datatype.number(98))
    const item2 = new InventoryItem(TENANT_ID, product2.getProductId(), 1 + faker.datatype.number(98))
    const item3 = new InventoryItem(TENANT_ID, product3.getProductId(), 1 + faker.datatype.number(98))
    await inventoryStore.save(item1)
    await inventoryStore.save(item2)
    await inventoryStore.save(item3)

    const sut = new LoadItemsFromInventory(inventoryStore)
    const inventoryItemList = await sut.load(TENANT_ID)

    expect(inventoryStore.addCallsCount).toBe(3)
    expect(inventoryItemList).toHaveLength(3)
  })

  it('should return an empty list if there is no items in inventory', async () => {
    const inventoryStore = new InMemoryInventoryStore()
    
    const sut = new LoadItemsFromInventory(inventoryStore)
    const inventoryItemList = await sut.load(TENANT_ID)

    expect(inventoryStore.addCallsCount).toBe(0)
    expect(inventoryItemList).toHaveLength(0)
  })

})