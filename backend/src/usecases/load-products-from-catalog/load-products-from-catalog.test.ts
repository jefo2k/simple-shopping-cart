import { LoadProductsFromCatalog } from './load-products-from-catalog'
import { InMemoryProductStore } from '../../data/in-memory-product-store'

describe('Product manager tests', () => {
  
  it('should not load Product on init', () => {
    const inventoryStore = new InMemoryProductStore()
    new LoadProductsFromCatalog(inventoryStore)

    // inventoryManager.add(new Product('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(0)
  })

})