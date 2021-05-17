import { RemoveItemFromCart } from './remove-item-from-cart'
import { InMemoryInventoryStore } from '../../data/in-memory/in-memory-inventory-store'
import { InMemoryProductStore } from '../../data/in-memory/in-memory-product-store'
import { InMemoryCartStore } from '../../data/in-memory/in-memory-cart-store'
import { Product, InventoryItem } from '../../domain/entities'
import { LoadItemsFromCart } from '../load-items-from-cart/load-items-from-cart'
import { AddItemToCart } from '../add-item-to-cart/add-item-to-cart';
import { LoadItemsFromInventory } from '..';
import { LoadProductsFromCatalog } from '../load-products-from-catalog/load-products-from-catalog';
import { AddToCartDto } from '../../dtos/add-to-cart-dto';
import * as faker from 'faker'

const TENANT_ID = faker.datatype.uuid()
const CART_ID = faker.datatype.uuid()

describe('Remove items from cart usecase tests', () => {
  
  it('should remove items from a specific cart', async () => {
    const productStore = new InMemoryProductStore()
    const inventoryStore = new InMemoryInventoryStore()
    const cartStore = new InMemoryCartStore()
    
    const loadInventoryItems = new LoadItemsFromInventory(inventoryStore)
    const loadProductsFromCatalog = new LoadProductsFromCatalog(productStore)
    const addItemToCart = new AddItemToCart(cartStore, loadInventoryItems, loadProductsFromCatalog)
    const loadItemsFromCart = new LoadItemsFromCart(cartStore)

    const sut = new RemoveItemFromCart(cartStore)

    const product1 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product2 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product3 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await productStore.save(product1)
    await productStore.save(product2)
    await productStore.save(product3)

    const item1 = new InventoryItem(TENANT_ID, product1.getProductId(), 1 + faker.datatype.number(98))
    const item2 = new InventoryItem(TENANT_ID, product2.getProductId(), 1 + faker.datatype.number(98))
    const item3 = new InventoryItem(TENANT_ID, product3.getProductId(), 1 + faker.datatype.number(98))
    await inventoryStore.save(item1)
    await inventoryStore.save(item2)
    await inventoryStore.save(item3)

    const cartItem1: AddToCartDto = {
      cartId: CART_ID,
      productId: product1.getProductId(),
      quantity: 1
    }
    const cartItem2: AddToCartDto = {
      cartId: CART_ID,
      productId: product2.getProductId(),
      quantity: 1
    }
    const cartItem3: AddToCartDto = {
      cartId: CART_ID,
      productId: product3.getProductId(),
      quantity: 1
    }
    await addItemToCart.add(cartItem1, TENANT_ID)
    await addItemToCart.add(cartItem2, TENANT_ID)
    await addItemToCart.add(cartItem3, TENANT_ID)

    await sut.remove(CART_ID, product1.getProductId())
    await sut.remove(CART_ID, product3.getProductId())

    const cartItemList = await loadItemsFromCart.load(TENANT_ID, CART_ID)

    expect(cartStore.removeCallsCount).toBe(2)
    expect(cartItemList).toHaveLength(1)
  })

})