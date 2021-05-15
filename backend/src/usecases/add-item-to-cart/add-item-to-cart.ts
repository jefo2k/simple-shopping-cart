import { CartItem } from '../../domain/entities'
import { AddCartItem, LoadInventoryItems, LoadProducts } from '../ports'
import { CartStore } from '../../data/ports'

export class AddItemToCart implements AddCartItem {
  constructor(
    private readonly cartStore: CartStore,
    private readonly loadInventoryItemsUc: LoadInventoryItems,
    private readonly loadProductsUc: LoadProducts
  ) {}

  async add(cartItem: CartItem): Promise<void> {
    
    try {
      await this.loadProductsUc.loadById(cartItem.getTenantId(), cartItem.getProductId())
      await this.loadInventoryItemsUc.loadById(cartItem.getTenantId(), cartItem.getProductId())
      await this.checkAvailability(cartItem.getTenantId(), cartItem.getProductId(), cartItem.getQuantity())

      const cartItemFound = await this.getCartItemByProductID(cartItem.getTenantId(), cartItem.getCartId(), cartItem.getProductId())

      if(!cartItemFound) {
        await this.cartStore.save(cartItem)
      } else {
        cartItemFound.setQuantity(cartItemFound.getQuantity() + cartItem.getQuantity())
        await this.cartStore.update(cartItemFound)
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  private async checkAvailability(tenantId: string, productId: string, desiredQuantity: number) {
    const item = await this.loadInventoryItemsUc.loadById(tenantId, productId)

    if (desiredQuantity > item.getQuantity()) {
      throw new Error('product out of stock')
    } 
  }

  private async getCartItemByProductID(tenantId: string, cartItemId: string, productId: string) {
    const cartItems = await this.cartStore.loadAll(tenantId, cartItemId)

    const cartItem = cartItems.find(c => c.getProductId() === productId)
    return cartItem
  }
  
}