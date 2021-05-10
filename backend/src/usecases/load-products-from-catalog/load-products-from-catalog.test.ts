import { LoadProductsFromCatalog } from './load-products-from-catalog'
import { InMemoryProductStore } from '../../data/in-memory/in-memory-product-store'
import { Product } from '../../domain/entities'
import * as faker from 'faker'

const TENANT_ID = faker.datatype.uuid()

describe('Load products from catalog usecase tests', () => {
  
  it('should not load Product on init', () => {
    const productStore = new InMemoryProductStore()
    new LoadProductsFromCatalog(productStore)

    expect(productStore.addCallsCount).toBe(0)
  })

  it('should load all products from catalog', async () => {
    const productStore = new InMemoryProductStore()
    const product1 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product2 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product3 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await productStore.save(product1)
    await productStore.save(product2)
    await productStore.save(product3)

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