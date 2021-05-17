import { AddItemToCart, AddItemOnInventory, LoadItemsFromInventory, AddProductOnCatalog, LoadProductsFromCatalog } from '..'
import { Product, InventoryItem } from '../../domain/entities'
import { InMemoryCartStore } from '../../data/in-memory/in-memory-cart-store'
import { InMemoryInventoryStore } from '../../data/in-memory/in-memory-inventory-store'
import { InMemoryProductStore } from '../../data/in-memory/in-memory-product-store'
import { AddToCartDto } from '../../dtos'
import * as faker from 'faker'

const TENANT_ID = faker.datatype.uuid()
const CART_ID = faker.datatype.uuid()

describe('Add items on an specific Cart tests', () => {

  it('should add item to cart if product exists on catalog, product exists on inventory and product has availability', async () => {
    const cartStore = new InMemoryCartStore()
    const inventoryStore = new InMemoryInventoryStore()
    const productStore = new InMemoryProductStore()

    const addProductOnCatalogUc = new AddProductOnCatalog(productStore)
    const loadProductsFromCatalogUc = new LoadProductsFromCatalog(productStore)
    const addItemOnInventoryUc = new AddItemOnInventory(inventoryStore, loadProductsFromCatalogUc)
    const loadItemsFromInventoryUc = new LoadItemsFromInventory(inventoryStore)

    const sut = new AddItemToCart(cartStore, loadItemsFromInventoryUc, loadProductsFromCatalogUc)

    const product1Id = faker.datatype.uuid()
    const product1 = new Product(TENANT_ID, product1Id, faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await addProductOnCatalogUc.add(product1)

    const inventoryItem1 = new InventoryItem(TENANT_ID, product1.getProductId(), 2)
    await addItemOnInventoryUc.add(inventoryItem1)

    // with no cartId
    const cartItemDto1: AddToCartDto = {
      productId: product1Id,
      quantity: 1
    }
    await sut.add(cartItemDto1, TENANT_ID)

    // with cartId
    const cartItemDto2: AddToCartDto = {
      cartId: CART_ID,
      productId: product1Id,
      quantity: 2
    }
    await sut.add(cartItemDto2, TENANT_ID)

    expect(cartStore.addCallsCount).toBe(2)
    
    const cartList = await cartStore.loadAll(TENANT_ID, CART_ID)
    expect(cartList).toHaveLength(1)
  })

  it('should not add item to cart if product not exists on catalog', async () => {
    const cartStore = new InMemoryCartStore()
    const inventoryStore = new InMemoryInventoryStore()
    const productStore = new InMemoryProductStore()

    const loadProductsFromCatalogUc = new LoadProductsFromCatalog(productStore)
    const loadItemsFromInventoryUc = new LoadItemsFromInventory(inventoryStore)

    const sut = new AddItemToCart(cartStore, loadItemsFromInventoryUc, loadProductsFromCatalogUc)

    const cartItemDto1: AddToCartDto = {
      cartId: CART_ID,
      productId: faker.datatype.uuid(),
      quantity: 2
    }
    expect(async () => {
      await sut.add(cartItemDto1, TENANT_ID)
    }).rejects.toThrowError('product does not exist')
  })

  it('should not add item to cart if product does not exists in inventory', async () => {
    const cartStore = new InMemoryCartStore()
    const inventoryStore = new InMemoryInventoryStore()
    const productStore = new InMemoryProductStore()

    const addProductOnCatalogUc = new AddProductOnCatalog(productStore)
    const loadProductsFromCatalogUc = new LoadProductsFromCatalog(productStore)
    const loadItemsFromInventoryUc = new LoadItemsFromInventory(inventoryStore)

    const sut = new AddItemToCart(cartStore, loadItemsFromInventoryUc, loadProductsFromCatalogUc)

    const product1Id = faker.datatype.uuid()
    const product1 = new Product(TENANT_ID, product1Id, faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await addProductOnCatalogUc.add(product1)

    const cartItemDto1: AddToCartDto = {
      cartId: CART_ID,
      productId: product1Id,
      quantity: 2
    }
    expect(async () => {
      await sut.add(cartItemDto1, TENANT_ID)
    }).rejects.toThrowError('product unavailable')
  })

  it('should not add item to cart if product does not have availability in inventory', async () => {
    const cartStore = new InMemoryCartStore()
    const inventoryStore = new InMemoryInventoryStore()
    const productStore = new InMemoryProductStore()

    const addProductOnCatalogUc = new AddProductOnCatalog(productStore)
    const loadProductsFromCatalogUc = new LoadProductsFromCatalog(productStore)
    const addItemOnInventoryUc = new AddItemOnInventory(inventoryStore, loadProductsFromCatalogUc)
    const loadItemsFromInventoryUc = new LoadItemsFromInventory(inventoryStore)

    const sut = new AddItemToCart(cartStore, loadItemsFromInventoryUc, loadProductsFromCatalogUc)

    const product1Id = faker.datatype.uuid()
    const product1 = new Product(TENANT_ID, product1Id, faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await addProductOnCatalogUc.add(product1)

    const inventoryItem1 = new InventoryItem(TENANT_ID, product1.getProductId(), 1)
    await addItemOnInventoryUc.add(inventoryItem1)

    const cartItemDto1: AddToCartDto = {
      cartId: CART_ID,
      productId: product1Id,
      quantity: 2
    }
    expect(async () => {
      await sut.add(cartItemDto1, TENANT_ID)
    }).rejects.toThrowError('product out of stock')
  })

  it('should update item quantity if it already exists on the cart', async () => {
    const cartStore = new InMemoryCartStore()
    const inventoryStore = new InMemoryInventoryStore()
    const productStore = new InMemoryProductStore()
    
    const addProductOnCatalogUc = new AddProductOnCatalog(productStore)
    const loadProductsFromCatalogUc = new LoadProductsFromCatalog(productStore)
    const addItemOnInventoryUc = new AddItemOnInventory(inventoryStore, loadProductsFromCatalogUc)
    const loadItemsFromInventoryUc = new LoadItemsFromInventory(inventoryStore)
    
    const sut = new AddItemToCart(cartStore, loadItemsFromInventoryUc, loadProductsFromCatalogUc)

    const product1Id = faker.datatype.uuid()
    const product1 = new Product(TENANT_ID, product1Id, faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await addProductOnCatalogUc.add(product1)

    const inventoryItem1 = new InventoryItem(TENANT_ID, product1.getProductId(), 2)
    await addItemOnInventoryUc.add(inventoryItem1)

    const cartItemDto1: AddToCartDto = {
      cartId: CART_ID,
      productId: product1Id,
      quantity: 1
    }
    await sut.add(cartItemDto1, TENANT_ID)
    await sut.add(cartItemDto1, TENANT_ID)
    expect(cartStore.addCallsCount).toBe(1)
    expect(cartStore.updateCallsCount).toBe(1)
    
    const cartList = await cartStore.loadAll(TENANT_ID, CART_ID)
    expect(cartList).toHaveLength(1)

    const updatedCartItem = cartList.find(c => c.getProductId() === product1.getProductId())
    expect(updatedCartItem.getQuantity()).toBe(2)
  })

})
