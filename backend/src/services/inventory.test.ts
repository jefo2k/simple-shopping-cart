import { InventoryStore } from '../data/ports'
import { LocalInventoryManager } from '.'

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
    new LocalInventoryManager(inventoryStore)

    // inventoryManager.add(new InventoryItem('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(0)
  })

  it('should call save once when an inventory item is added', async () => {
    const inventoryStore = new InventoryStoreSpy()
    const sut = new LocalInventoryManager(inventoryStore)
    await sut.save()

    // inventoryManager.add(new InventoryItem('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(1)
  })

})