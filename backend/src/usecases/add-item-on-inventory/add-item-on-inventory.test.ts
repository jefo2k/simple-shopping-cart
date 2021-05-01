import { InventoryStore } from '../../data/ports'
import { AddProductOnCatalog } from '..'

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
    const sut = new AddProductOnCatalog(inventoryStore)
    await sut.save()

    // inventoryManager.add(new InventoryItem('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(1)
  })

})