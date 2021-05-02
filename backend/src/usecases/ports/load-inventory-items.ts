import { InventoryItem } from '../../domain/entities'

export interface LoadInventoryItems {
  load: () => Promise<InventoryItem[]>
}