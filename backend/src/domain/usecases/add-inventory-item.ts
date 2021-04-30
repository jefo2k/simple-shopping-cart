import { InventoryItem } from '../entities'

export interface AddInventoryItem {
  add: (inventoryItem: InventoryItem) => void
}