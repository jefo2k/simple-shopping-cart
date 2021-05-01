import { ProductStore } from '../../data/ports'
import { AddProductOnCatalog } from './add-product-on-catalog'
import { Product } from '../../domain/entities/product';

class ProductStoreSpy implements ProductStore {
  addCallsCount = 0
  catalog: Array<Product> = []

  async save (product: Product): Promise<void> {
    this. addCallsCount++
    this.catalog.push(product)
  }

  async loadById (productId: string) {
    const product = this.catalog.find(p => p.getId() === productId)
    return product
  }
}

describe('Add product on catalog tests', () => {
  
  it('should call save once when an inventory item is added', async () => {
    const productStore = new ProductStoreSpy()
    const sut = new AddProductOnCatalog(productStore)
    const product = new Product('1', 'Product 1', 'Product 1 short description')
    await sut.add(product)

    // inventoryManager.add(new Product('product1', 10))
    expect(productStore.addCallsCount).toBe(1)
  })

  it('should throw an exception when trying to add a product that already exists', async () => {
    const product = new Product('1', 'Product 1', 'Product 1 short description')
    const productStore = new ProductStoreSpy()
    
    const sut = new AddProductOnCatalog(productStore)

    await sut.add(product)

    expect(async () => {
      await sut.add(product)
    }).rejects.toThrowError('product already exists')
  })

})