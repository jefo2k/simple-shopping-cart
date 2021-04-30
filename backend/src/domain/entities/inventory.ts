export class InventoryItem {

  constructor(
    private productId: string,
    private quantity: number
  ) {
    
  }

  public getProductId() {
    return this.productId
  }

  public getQuantity() {
    return this.quantity
  }
}