import { AddItemToCart, LoadProductsFromCatalog, LoadItemsFromInventory } from '../../usecases'
import { DynamodbProductStore } from '../../data/dynamodb/dynamodb-product-store'
import { InMemoryCartStore } from '../../data/in-memory/in-memory-cart-store'
import { InMemoryInventoryStore } from '../../data/in-memory/in-memory-inventory-store'
import { DynamodbInventoryStore } from '../../data/dynamodb/dynamodb-inventory-store/dynamodb-inventory-store';

export const makeAddItemToCart = (): AddItemToCart => {
  //const cartStore = new DynamodbCartStore()
  const cartStore = new InMemoryCartStore()
  const inventoryStore = new DynamodbInventoryStore()
  const productStore = new DynamodbProductStore()

  const loadInventoryItemsUc = new LoadItemsFromInventory(inventoryStore)
  const loadProductsUc = new LoadProductsFromCatalog(productStore)
  
  const addItemToCartUc = new AddItemToCart(cartStore, loadInventoryItemsUc, loadProductsUc)

  return addItemToCartUc
}