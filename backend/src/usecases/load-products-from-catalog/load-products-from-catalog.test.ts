import { ProductStore } from '../../data/ports'
import { LoadProductsFromCatalog } from './load-products-from-catalog'
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

  async loadAll (): Promise<Product[]> {
    const productList = this.catalog
    return productList
  }
}

describe('Product manager tests', () => {
  
  it('should not load Product on init', () => {
    const inventoryStore = new ProductStoreSpy()
    new LoadProductsFromCatalog(inventoryStore)

    // inventoryManager.add(new Product('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(0)
  })

})