import { CartItem } from '../../domain/entities'

export interface AddCartItem {
  add: (cartItem: CartItem) => void
}
