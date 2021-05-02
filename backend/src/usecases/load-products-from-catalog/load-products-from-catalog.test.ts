import { LoadProductsFromCatalog } from './load-products-from-catalog'
import { InMemoryProductStore } from '../../data/in-memory-product-store'
import { Product } from '../../domain/entities'
import * as faker from 'faker'

describe('Load products from catalog usecase tests', () => {
  
  it('should not load Product on init', () => {
    const productStore = new InMemoryProductStore()
    new LoadProductsFromCatalog(productStore)

    // inventoryManager.add(new Product('product1', 10))
    expect(productStore.addCallsCount).toBe(0)
  })

  it('should load all products from catalog', async () => {
    const productStore = new InMemoryProductStore()
    const product1 = new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription())
    const product2 = new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription())
    const product3 = new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription())
    productStore.save(product1)
    productStore.save(product2)
    productStore.save(product3)

    const sut = new LoadProductsFromCatalog(productStore)
    const productList = await sut.load()

    expect(productStore.addCallsCount).toBe(3)
    expect(productList).toHaveLength(3)
  })

  it('should return an empty list if there is no products in catalog', async () => {
    const productStore = new InMemoryProductStore()
    
    const sut = new LoadProductsFromCatalog(productStore)
    const productList = await sut.load()

    expect(productStore.addCallsCount).toBe(0)
    expect(productList).toHaveLength(0)
  })

})