import { CartItem } from '../../domain/entities'

export interface CartStore {
  save: (cartItem: CartItem) => Promise<string>
  update: (cartItem: CartItem) => Promise<string>
  loadAll: (tenantId: string, cartId: string) => Promise<CartItem[]>
  loadByProductId: (cartId: string, productId: string) => Promise<CartItem>
  removeByProduct: (cartId: string, productId: string) => Promise<void>
}
