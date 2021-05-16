import { InMemoryCartStore } from '../../data/in-memory/in-memory-cart-store'
import { LoadItemsFromCart } from '../../usecases'

export const makeLoadItemsFromCart = (): LoadItemsFromCart => {
  //const cartStore = new DynamodbCartStore()
  const cartStore = new InMemoryCartStore()
  
  const loadItemsFromCart = new LoadItemsFromCart(cartStore)

  return loadItemsFromCart
}
