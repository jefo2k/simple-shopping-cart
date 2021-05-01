import { InventoryItem } from '../../domain/entities'
import { AddInventoryItem } from '../ports'
import { InventoryStore } from '../../data/ports'

export class AddItemOnInventory implements AddInventoryItem {
  constructor(
    private readonly inventoryStore: InventoryStore
  ) {}

  async add(_: InventoryItem): Promise<void> {
    this.inventoryStore.save()
  }
}