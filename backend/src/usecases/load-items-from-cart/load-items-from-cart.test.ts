import { LoadItemsFromCart } from './load-items-from-cart';
import { InMemoryInventoryStore } from '../../data/in-memory/in-memory-inventory-store'
import { InMemoryProductStore } from '../../data/in-memory/in-memory-product-store'
import { InMemoryCartStore } from '../../data/in-memory/in-memory-cart-store'
import { Product, InventoryItem, CartItem } from '../../domain/entities'
import * as faker from 'faker'

const TENANT_ID = faker.datatype.uuid()
const CART_ID = faker.datatype.uuid()

describe('Load items from cart usecase tests', () => {
  
  it('should load all items from a specific cart', async () => {
    const productStore = new InMemoryProductStore()
    const product1 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product2 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product3 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await productStore.save(product1)
    await productStore.save(product2)
    await productStore.save(product3)

    const inventoryStore = new InMemoryInventoryStore()
    const item1 = new InventoryItem(TENANT_ID, product1.getProductId(), 1 + faker.datatype.number(98))
    const item2 = new InventoryItem(TENANT_ID, product2.getProductId(), 1 + faker.datatype.number(98))
    const item3 = new InventoryItem(TENANT_ID, product3.getProductId(), 1 + faker.datatype.number(98))
    await inventoryStore.save(item1)
    await inventoryStore.save(item2)
    await inventoryStore.save(item3)

    const cartStore = new InMemoryCartStore()
    const cartItem1 = new CartItem(TENANT_ID, CART_ID, product1.getProductId(), 1)
    const cartItem2 = new CartItem(TENANT_ID, CART_ID, product1.getProductId(), 1)
    const cartItem3 = new CartItem(TENANT_ID, CART_ID, product1.getProductId(), 1)
    await cartStore.save(cartItem1)
    await cartStore.save(cartItem2)
    await cartStore.save(cartItem3)

    const sut = new LoadItemsFromCart(cartStore)
    const cartItemList = await sut.load(TENANT_ID, CART_ID)

    expect(cartStore.addCallsCount).toBe(3)
    expect(cartItemList).toHaveLength(3)
  })

  it('should return an empty list if there is no items in inventory', async () => {
    const cartStore = new InMemoryCartStore()
    
    const sut = new LoadItemsFromCart(cartStore)
    const inventoryItemList = await sut.load(TENANT_ID, CART_ID)

    expect(cartStore.addCallsCount).toBe(0)
    expect(inventoryItemList).toHaveLength(0)
  })

})