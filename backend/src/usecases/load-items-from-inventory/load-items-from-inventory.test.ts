import { LoadItemsFromInventory } from './load-items-from-inventory'
import { InMemoryInventoryStore } from '../../data/in-memory-inventory-store'

describe('Inventory manager tests', () => {
  
  it('should not load inventory on init', () => {
    const inventoryStore = new InMemoryInventoryStore()
    new LoadItemsFromInventory(inventoryStore)

    expect(inventoryStore.addCallsCount).toBe(0)
  })

})