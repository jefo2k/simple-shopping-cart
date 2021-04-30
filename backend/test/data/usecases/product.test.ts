import { Product } from '../../../src/domain/entities';
import { ProductManager } from "../../../src/domain/usecases"

interface ProductStore {
  save: () => void
}

class ProductStoreSpy implements ProductStore {
  addCallsCount = 0
  loadCallsCount = 0

  save (): void {
    this. addCallsCount++
  }
}

class LocalProductManager implements ProductManager {
  constructor(
    private readonly ProductStore: ProductStore
  ) {}

  async save(): Promise<void> {
    this.ProductStore.save()
  }
  
  add(_: Product) {}
  
  load() {}
}

describe('Product manager tests', () => {
  
  it('should not load Product on init', () => {
    const inventoryStore = new ProductStoreSpy()
    new LocalProductManager(inventoryStore)

    // inventoryManager.add(new Product('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(0)
  })

  it('should call save once when an inventory item is added', async () => {
    const inventoryStore = new ProductStoreSpy()
    const sut = new LocalProductManager(inventoryStore)
    await sut.save()

    // inventoryManager.add(new Product('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(1)
  })

})