import { CartItem } from '../../domain/entities'

export interface CartStore {
  save: (cartItem: CartItem) => Promise<void>
  update: (cartItem: CartItem) => Promise<void>
  loadAll: (tenantId: string, cartId: string) => Promise<CartItem[]>
}
