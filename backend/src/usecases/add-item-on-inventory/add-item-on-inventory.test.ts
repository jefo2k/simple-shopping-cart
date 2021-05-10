import { AddItemOnInventory } from '..'
import { InventoryItem } from '../../domain/entities'
import { InMemoryInventoryStore } from '../../data/in-memory/in-memory-inventory-store'
import { InMemoryProductStore } from '../../data/in-memory/in-memory-product-store/in-memory-product-store'
import { Product } from '../../domain/entities'
import * as faker from 'faker'

describe('Add items on Inventory tests', () => {

  it('should add item into inventory if product exists on catalog', async () => {
    const inventoryStore = new InMemoryInventoryStore()
    const productStore = new InMemoryProductStore()
    const product1 = new Product('product1', faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await productStore.save(product1)

    const sut = new AddItemOnInventory(inventoryStore, productStore)

    const inventoryIem = new InventoryItem(product1.getId(), 20)
    
    await sut.add(inventoryIem)

    expect(inventoryStore.addCallsCount).toBe(1)
    const productList = await inventoryStore.loadAll()

    expect(inventoryStore.addCallsCount).toBe(1)
    expect(productList).toHaveLength(1)
  })

  it('should not add an item if product does not exist in catalog', async () => {
    const inventoryStore = new InMemoryInventoryStore()
    const productStore = new InMemoryProductStore()
    const sut = new AddItemOnInventory(inventoryStore, productStore)

    const inventoryIem = new InventoryItem('id_of_an_inexistent_product', 20)

    expect(async () => {
      await sut.add(inventoryIem)
    }).rejects.toThrowError('product does not exist')

  })

  it('should not add an item if it already exists', async () => {
    const inventoryStore = new InMemoryInventoryStore()
    const productStore = new InMemoryProductStore()
    const product1 = new Product('product1', faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await productStore.save(product1)

    const sut = new AddItemOnInventory(inventoryStore, productStore)

    const inventoryIem = new InventoryItem(product1.getId(), 20)

    await sut.add(inventoryIem)

    expect(async () => {
      await sut.add(inventoryIem)
    }).rejects.toThrowError('inventory item already exists')

  })

})