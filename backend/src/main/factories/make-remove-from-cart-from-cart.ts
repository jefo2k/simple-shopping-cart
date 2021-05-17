import { RemoveItemFromCart } from '../../usecases'
import { DynamodbCartStore } from '../../data/dynamodb/dynamodb-cart-store'

export const makeRemoveItemFromCart = (): RemoveItemFromCart => {
  const cartStore = new DynamodbCartStore()
  
  const removeItemFromCart = new RemoveItemFromCart(cartStore)

  return removeItemFromCart
}
