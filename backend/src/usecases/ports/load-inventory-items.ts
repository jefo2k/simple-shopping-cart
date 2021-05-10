import { InventoryItem } from '../../domain/entities'

export interface LoadInventoryItems {
  load: (tenantId: string) => Promise<InventoryItem[]>
}