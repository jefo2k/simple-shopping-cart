import { InventoryItem } from '../../../src/domain/entities';
import { addInventoryItem, loadInventoryItem } from "../../../src/domain/usecases"

interface InventoryStore {
  save: () => void
}

class InventoryStoreSpy implements InventoryStore {
  addCallsCount = 0
  loadCallsCount = 0

  save (): void {
    this. addCallsCount++
  }
}

class LocalInventoryManager implements addInventoryItem, loadInventoryItem {
  constructor(
    private readonly inventoryStore: InventoryStore
  ) {}

  async save(): Promise<void> {
    this.inventoryStore.save()
  }
  
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

  it('should call save once when an inventory item is added', async () => {
    const inventoryStore = new InventoryStoreSpy()
    const sut = new LocalInventoryManager(inventoryStore)
    await sut.save()

    // inventoryManager.add(new InventoryItem('product1', 10))
    expect(inventoryStore.addCallsCount).toBe(1)
  })

})