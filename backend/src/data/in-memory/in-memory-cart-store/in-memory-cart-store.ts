import { CartStore } from '../../ports'
import { CartItem } from '../../../domain/entities'

export class InMemoryCartStore implements CartStore {
  addCallsCount = 0
  updateCallsCount = 0
  loadCallsCount = 0

  private cart: Array<CartItem> = []
  
  async save (cartItem: CartItem): Promise<void> {
    this.addCallsCount++
    this.cart.push(cartItem)
  }
  
  async loadAll (tenantId: string, cartId: string): Promise<CartItem[]> {
    this.loadCallsCount++
    return this.cart.filter(i => i.getTenantId() === tenantId && i.getCartId() === cartId)
  }

  async update (cartItem: CartItem): Promise<void> {
    this.updateCallsCount++
    const foundCarItem = this.cart.find(i => 
      i.getTenantId() === cartItem.getTenantId() && 
      i.getCartId() === cartItem.getCartId() &&
      i.getProductId() === cartItem.getProductId())

    if (foundCarItem) {
      foundCarItem.setQuantity(cartItem.getQuantity())
    }
  }
}