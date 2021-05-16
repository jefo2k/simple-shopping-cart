import { CartItem } from '../../domain/entities'
import { AddCartItem, LoadInventoryItems, LoadProducts } from '../ports'
import { CartStore } from '../../data/ports'
import { AddToCartDto } from '../../dtos'
import * as uuid from 'uuid'

export class AddItemToCart implements AddCartItem {
  constructor(
    private readonly cartStore: CartStore,
    private readonly loadInventoryItemsUc: LoadInventoryItems,
    private readonly loadProductsUc: LoadProducts
  ) {}

  async add(addToCartDto: AddToCartDto, tenantId: string): Promise<string> {
    const { cartId = uuid.v4(), productId, quantity } = addToCartDto
    
    try {
      // checks if product exists
      await this.loadProductsUc.loadById(tenantId, productId)
      // checks if product is in inventory
      await this.loadInventoryItemsUc.loadById(tenantId, productId)
      // check if product is available
      await this.checkAvailability(tenantId, productId, quantity)

      const cartItemFound = await this.getCartItemByProductID(tenantId, cartId, productId)

      if (!cartItemFound) {
        const cartItem = new CartItem(tenantId, cartId, productId, quantity)
        return await this.cartStore.save(cartItem)
      } else {
        cartItemFound.setQuantity(cartItemFound.getQuantity() + quantity)
        return await this.cartStore.update(cartItemFound)
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

  private async getCartItemByProductID(tenantId: string, cartId: string, productId: string) {
    const cartItems = await this.cartStore.loadAll(tenantId, cartId)

    const cartItem = cartItems.find(c => c.getProductId() === productId)
    return cartItem
  }
  
}