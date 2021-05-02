import { InventoryItem } from '../../domain/entities'

export interface InventoryStore {
  save: (inventoryItem: InventoryItem) => Promise<void>
  loadById: (productId: string) => Promise<InventoryItem>
  loadAll: () => Promise<InventoryItem[]>
}