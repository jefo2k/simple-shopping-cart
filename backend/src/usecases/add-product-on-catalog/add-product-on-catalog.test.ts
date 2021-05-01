import { ProductStore } from '../../data/ports'
import { AddProductOnCatalog } from './add-product-on-catalog'

class ProductStoreSpy implements ProductStore {
  addCallsCount = 0
  loadCallsCount = 0

  save (): void {
    this. addCallsCount++
  }
}

describe('Product manager tests', () => {
  
  it('should call save once when an inventory item is added', async () => {
    const inventoryStore = new ProductStoreSpy()
    const sut = new AddProductOnCatalog(inventoryStore)
    await sut.save()

    // inventoryManager.add(new Product('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(1)
  })

})