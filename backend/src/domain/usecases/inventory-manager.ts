import { InventoryItem } from '../entities/inventory';

export interface InventoryManager {
  add: (inventoryItem: InventoryItem) => void
  load: () => void
}