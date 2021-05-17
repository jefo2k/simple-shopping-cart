import { CartItem } from '../../domain/entities'

export interface LoadCartItems {
  load: (tenantId: string, cartId: string) => Promise<CartItem[]>
}
