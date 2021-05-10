import { InventoryItem } from '../../domain/entities'

export interface InventoryStore {
  save: (inventoryItem: InventoryItem) => Promise<void>
  loadById: (tenantId: string, productId: string) => Promise<InventoryItem>
  loadAll: (tenantId: string) => Promise<InventoryItem[]>
}