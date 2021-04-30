import { InventoryItem } from '../entities';

export interface InventoryManager {
  add: (inventoryItem: InventoryItem) => void
  load: () => void
}