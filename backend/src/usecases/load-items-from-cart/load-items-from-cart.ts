import { LoadCartItems } from '../ports'
import { CartStore } from '../../data/ports'
import { CartItem } from '../../domain/entities'

export class LoadItemsFromCart implements LoadCartItems {
  constructor (
    private readonly cartStore: CartStore
  ) {}
  
  async load (tenantId: string, cartId: string): Promise<CartItem[]> {
    return await this.cartStore.loadAll(tenantId, cartId)
  }

}