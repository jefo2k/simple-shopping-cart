export class InventoryItem {
  
  private tenantId: string
  private productId: string
  private quantity: number

  constructor(tenantId: string, productId: string, quantity: number) {
    this.validateParams(tenantId, productId, quantity)

    this.tenantId = tenantId
    this.productId = productId
    this.quantity = quantity

    // Object.freeze(this)
  }

  public getTenantId() {
    return this.tenantId
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

  private validateParams(tenantId: string, productId: string, quantity: number): void {
    if (!tenantId || tenantId.trim().length < 1 ) throw new Error('invalid tenantId, must not be empty')
    if (!productId || productId.trim().length < 1 ) throw new Error('invalid productId, must not be empty')
    if (!quantity || quantity < 1) throw new Error('invalid quantity, must be greater than 0')
    if (quantity > 99) throw new Error('invalid quantity, must be less than or equals 99')
  }
}