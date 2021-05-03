import { InventoryStore } from '../../ports/inventory-store'
import { InventoryItem } from '../../../domain/entities'

export class InMemoryInventoryStore implements InventoryStore {
  addCallsCount = 0
  private inventory: Array<InventoryItem> = []
  
  async save (inventoryItem: InventoryItem): Promise<void> {
    this.inventory.push(inventoryItem)
    this.addCallsCount++
  }

  async loadById (productId: string) {
    const item = this.inventory.find(p => p.getProductId() === productId)
    return item
  }

  async loadAll (): Promise<InventoryItem[]> {
    return this.inventory
  }
}