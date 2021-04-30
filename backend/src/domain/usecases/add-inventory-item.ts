import { InventoryItem } from '../entities'

export interface addInventoryItem {
  add: (inventoryItem: InventoryItem) => void
}