import { InventoryStore } from '../../data/ports'
import { AddItemOnInventory } from '..'
import { InventoryItem } from '../../domain/entities/inventory-item';

class InventoryStoreSpy implements InventoryStore {
  addCallsCount = 0
  loadCallsCount = 0

  save (): void {
    this. addCallsCount++
  }
}

describe('Inventory manager tests', () => {
  
  it('should call save once when an inventory item is added', async () => {
    const inventoryStore = new InventoryStoreSpy()
    const sut = new AddItemOnInventory(inventoryStore)
    const inventoryIem = new InventoryItem('product 1', 20)
    
    await sut.add(inventoryIem)

    // inventoryManager.add(new InventoryItem('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(1)
  })

})