export class InventoryItem {
  
  private productId: string
  private quantity: number

  constructor(productId: string, quantity: number) {
    this.validateParams(productId, quantity)

    this.productId = productId
    this.quantity = quantity

    // Object.freeze(this)
  }

  public getProductId() {
    return this.productId
  }

  public getQuantity() {
    return this.quantity
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity
  }

  private validateParams(productId: string, quantity: number): void {
    if (!productId || productId.trim().length < 1 ) throw new Error('invalid productId, must not be empty')
    if (!quantity || quantity < 1) throw new Error('invalid quantity, must be greater than 0')
    if (quantity > 99) throw new Error('invalid quantity, must be less than or equals 99')
  }
}