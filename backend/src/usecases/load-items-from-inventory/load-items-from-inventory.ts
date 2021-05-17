import { LoadInventoryItems } from '../ports'
import { InventoryStore } from '../../data/ports'
import { InventoryItem } from '../../domain/entities'

export class LoadItemsFromInventory implements LoadInventoryItems {
  constructor (
    private readonly inventoryStore: InventoryStore
  ) {}
  
  async load (tenantId: string): Promise<InventoryItem[]> {
    return await this.inventoryStore.loadAll(tenantId)
  }

  async loadById (tenantId: string, inventoryItemId: string): Promise<InventoryItem> {
    const item = await this.inventoryStore.loadById(tenantId, inventoryItemId)
    if (!item) {
      throw new Error('product unavailable')
    }
    return item
  }
}