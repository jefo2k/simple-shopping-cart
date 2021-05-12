import { InventoryStore } from '../../ports/inventory-store'
import { InventoryItem } from '../../../domain/entities'

export class InMemoryInventoryStore implements InventoryStore {
  addCallsCount = 0
  private inventory: Array<InventoryItem> = []
  
  async save (inventoryItem: InventoryItem): Promise<void> {
    this.inventory.push(inventoryItem)
    this.addCallsCount++
  }

  async loadById (tenantId: string, productId: string) {
    const item = this.inventory.find(p => p.getTenantId() === tenantId && p.getProductId() === productId)
    return item
  }

  async loadAll (tenantId: string): Promise<InventoryItem[]> {
    return this.inventory.filter(i => i.getTenantId() === tenantId)
  }
}