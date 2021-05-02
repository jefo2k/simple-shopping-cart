import { LoadInventoryItems } from '../ports'
import { InventoryStore } from '../../data/ports'
import { InventoryItem } from '../../domain/entities'

export class LoadItemsFromInventory implements LoadInventoryItems {
  constructor(
    private readonly inventoryStore: InventoryStore
  ) {}
  
  async load(): Promise<InventoryItem[]> {
    return await this.inventoryStore.loadAll()
  }
}