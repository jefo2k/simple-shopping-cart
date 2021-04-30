import { InventoryItem } from '../domain/entities'
import { AddInventoryItem, LoadInventoryItem } from '../domain/usecases'
import { InventoryStore } from '../data/ports'

export class LocalInventoryManager implements AddInventoryItem, LoadInventoryItem {
  constructor(
    private readonly inventoryStore: InventoryStore
  ) {}

  async save(): Promise<void> {
    this.inventoryStore.save()
  }
  
  add(_: InventoryItem) {}
  
  load() {}
}