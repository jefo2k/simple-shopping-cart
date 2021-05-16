import { CartStore } from '../../ports'
import { CartItem } from '../../../domain/entities'

export class InMemoryCartStore implements CartStore {
  addCallsCount = 0
  updateCallsCount = 0
  loadCallsCount = 0
  
  private cart: Array<CartItem> = []
  
  async loadByProductId (cartId: string, productId: string): Promise<CartItem> {
    const cartItem = this.cart.find(c => c.getCartId() === cartId && c.getProductId() === productId)
    return cartItem
  }

  async save (cartItem: CartItem): Promise<string> {
    this.addCallsCount++
    this.cart.push(cartItem)
    return cartItem.getCartId()
  }
  
  async loadAll (tenantId: string, cartId: string): Promise<CartItem[]> {
    this.loadCallsCount++
    return this.cart.filter(i => i.getTenantId() === tenantId && i.getCartId() === cartId)
  }

  async update (cartItem: CartItem): Promise<string> {
    this.updateCallsCount++
    const foundCarItem = this.cart.find(i => 
      i.getTenantId() === cartItem.getTenantId() && 
      i.getCartId() === cartItem.getCartId() &&
      i.getProductId() === cartItem.getProductId())

    if (foundCarItem) {
      foundCarItem.setQuantity(cartItem.getQuantity())
    }
    return cartItem.getCartId()
  }
}