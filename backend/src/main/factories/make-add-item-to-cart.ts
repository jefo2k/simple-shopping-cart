import { AddItemToCart, LoadProductsFromCatalog, LoadItemsFromInventory } from '../../usecases'
import { DynamodbProductStore } from '../../data/dynamodb/dynamodb-product-store'
import { DynamodbInventoryStore } from '../../data/dynamodb/dynamodb-inventory-store'
import { DynamodbCartStore } from '../../data/dynamodb/dynamodb-cart-store'

export const makeAddItemToCart = (): AddItemToCart => {
  const cartStore = new DynamodbCartStore()
  const inventoryStore = new DynamodbInventoryStore()
  const productStore = new DynamodbProductStore()

  const loadInventoryItemsUc = new LoadItemsFromInventory(inventoryStore)
  const loadProductsUc = new LoadProductsFromCatalog(productStore)
  
  const addItemToCartUc = new AddItemToCart(cartStore, loadInventoryItemsUc, loadProductsUc)

  return addItemToCartUc
}