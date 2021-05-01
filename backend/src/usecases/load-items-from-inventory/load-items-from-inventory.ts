import { LoadInventoryItems } from '../ports'
import { InventoryStore } from '../../data/ports'

export class LoadItemsFromInventory implements LoadInventoryItems {
  constructor(
    private readonly inventoryStore: InventoryStore
  ) {}
  
  load() {}
}