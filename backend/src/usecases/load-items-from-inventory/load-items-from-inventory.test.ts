import { InventoryStore } from '../../data/ports'
import { LoadItemsFromInventory } from './load-items-from-inventory';

class InventoryStoreSpy implements InventoryStore {
  addCallsCount = 0
  loadCallsCount = 0

  save (): void {
    this. addCallsCount++
  }
}

describe('Inventory manager tests', () => {
  
  it('should not load inventory on init', () => {
    const inventoryStore = new InventoryStoreSpy()
    new LoadItemsFromInventory(inventoryStore)

    // inventoryManager.add(new InventoryItem('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(0)
  })

})