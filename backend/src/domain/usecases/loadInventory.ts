import { InventoryItem } from "../entities";

export interface loadInventory {
  load: () => Promise<InventoryItem[]>
}