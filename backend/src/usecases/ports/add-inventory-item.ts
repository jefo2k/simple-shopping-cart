import { InventoryItem } from '../../domain/entities'

export interface AddInventoryItem {
  add: (inventoryItem: InventoryItem) => void
}