import { ProductStore } from '../../data/ports'
import { AddProductOnCatalog } from './add-product-on-catalog'
import { Product } from '../../domain/entities/product';

class ProductStoreSpy implements ProductStore {
  addCallsCount = 0
  private catalog: Array<Product> = []
  
  async save (product: Product): Promise<void> {
    this. addCallsCount++
    this.catalog.push(product)
  }
  
  async loadById (productId: string) {
    const product = this.catalog.find(p => p.getId() === productId)
    return product
  }
  
  async loadAll (): Promise<Product[]> {
    const productList = this.catalog
    return productList
  }
}

describe('Add product on catalog tests', () => {
  
  it('should add product to the catalog', async () => {
    const productStore = new ProductStoreSpy()
    const sut = new AddProductOnCatalog(productStore)
    const product1 = new Product('1', 'Product 1', 'Product 1 short description')    
    
    await sut.add(product1)
    const productList = await productStore.loadAll()

    expect(productStore.addCallsCount).toBe(1)
    expect(productList).toHaveLength(1)
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