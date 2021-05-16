import { LoadItemsFromCart } from '../../usecases'
import { DynamodbCartStore } from '../../data/dynamodb/dynamodb-cart-store'

export const makeLoadItemsFromCart = (): LoadItemsFromCart => {
  const cartStore = new DynamodbCartStore()
  
  const loadItemsFromCart = new LoadItemsFromCart(cartStore)

  return loadItemsFromCart
}
