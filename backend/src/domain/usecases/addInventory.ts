import { InventoryItem } from '../entities/inventory';

export interface addInventory {
  add: (inventoryItem: InventoryItem) => Promise<InventoryItem>
}