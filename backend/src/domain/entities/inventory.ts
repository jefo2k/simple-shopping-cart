export class Inventory {
  private inventoryItems: InventoryItem[]

  constructor() {
    this.inventoryItems = []
  }

  public add(inventoryItem: InventoryItem) {
    this.inventoryItems.push(inventoryItem)
  }
}

export type InventoryItem = {
  productId: string
  quantity: number
}