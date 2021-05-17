export class CartItem {
  
  private tenantId: string
  private cartId: string
  private productId: string
  private quantity: number
  private createdAt: Date
  private updatedAt: Date

  constructor(tenantId: string, cartId: string, productId: string, quantity: number) {
    this.validateParams(tenantId, cartId, productId, quantity)

    this.tenantId = tenantId
    this.cartId = cartId
    this.productId = productId
    this.quantity = quantity

    const today = new Date()
    this.createdAt = today
    this.updatedAt = today

    // Object.freeze(this)
  }

  public getTenantId() {
    return this.tenantId
  }

  public getCartId() {
    return this.cartId
  }

  public getProductId() {
    return this.productId
  }

  public getQuantity() {
    return this.quantity
  }

  public getCreatedAt() {
    return this.createdAt
  }

  public getCreatedAtISOStr() {
    return this.createdAt.toISOString()
  }

  public getUpdatedAt() {
    return this.updatedAt
  }

  public getUpdatedAtISOStr() {
    return this.updatedAt.toISOString()
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity
    this.setUpdatedAt()
  }

  // handler functions
  private setUpdatedAt() {
    this.updatedAt = new Date()
  }

  private validateParams(tenantId: string, cartId: string, productId: string, quantity: number): void {
    if (!tenantId || tenantId.trim().length < 1 ) throw new Error('invalid tenantId, must not be empty')
    if (!cartId || cartId.trim().length < 1 ) throw new Error('invalid cartId, must not be empty')
    if (!productId || productId.trim().length < 1 ) throw new Error('invalid productId, must not be empty')
    if (!quantity || quantity < 1) throw new Error('invalid quantity, must be greater than 0')
    if (quantity > 10) throw new Error('invalid quantity, must be less than or equals 10')
  }
}