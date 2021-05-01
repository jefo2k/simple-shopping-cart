import { ProductStore } from '../../data/ports'
import { LoadProductsFromCatalog } from './load-products-from-catalog'

class ProductStoreSpy implements ProductStore {
  addCallsCount = 0
  loadCallsCount = 0

  save (): void {
    this. addCallsCount++
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