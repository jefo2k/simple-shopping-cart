import { RemoveCartItem } from '../ports'
import { CartStore } from '../../data/ports'

export class RemoveItemFromCart implements RemoveCartItem {
  constructor (
    private readonly cartStore: CartStore
  ) {}
  
  async remove (cartId: string, productId: string): Promise<void> {
    return await this.cartStore.removeByProduct(cartId, productId)
  }

}