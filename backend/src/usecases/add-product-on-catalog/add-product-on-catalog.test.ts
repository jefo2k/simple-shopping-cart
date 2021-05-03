import { AddProductOnCatalog } from './add-product-on-catalog'
import { Product } from '../../domain/entities/product'
import { InMemoryProductStore } from '../../data/in-memory/in-memory-product-store'

describe('Add product on catalog tests', () => {
  
  it('should add product to the catalog', async () => {
    const productStore = new InMemoryProductStore()
    const sut = new AddProductOnCatalog(productStore)
    const product1 = new Product('1', 'Product 1', 'Product 1 short description')    
    
    await sut.add(product1)
    const productList = await productStore.loadAll()

    expect(productStore.addCallsCount).toBe(1)
    expect(productList).toHaveLength(1)
  })

  it('should throw an exception when trying to add a product that already exists', async () => {
    const product = new Product('1', 'Product 1', 'Product 1 short description')
    const productStore = new InMemoryProductStore()
    
    const sut = new AddProductOnCatalog(productStore)

    await sut.add(product)

    expect(async () => {
      await sut.add(product)
    }).rejects.toThrowError('product already exists')
  })

})