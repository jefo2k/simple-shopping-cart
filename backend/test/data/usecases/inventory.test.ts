import { InventoryManager } from "../../../src/domain/usecases"
import { InventoryItem } from '../../../src/domain/entities/inventory';

interface InventoryStore {

}

class InventoryStoreSpy implements InventoryStore {
  addCallsCount = 0
  loadCallsCount = 0
}

class LocalInventoryManager implements InventoryManager {
  constructor(
    private readonly _inventoryStore: InventoryStore
  ) {}

  add(_: InventoryItem) {}
  
  load() {}
}

describe('Inventory manager tests', () => {
  
  it('should not load inventory on init', () => {
    const inventoryStore = new InventoryStoreSpy()
    new LocalInventoryManager(inventoryStore)

    // inventoryManager.add(new InventoryItem('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(0)
  })

})