import * as faker from 'faker'
import { InMemoryCartStore } from './in-memory-cart-store'
import { CartItem } from '../../../domain/entities/cart-item';

const TENANT_ID = faker.datatype.uuid()
const TENANT_ID_2 = faker.datatype.uuid()
const CART_ID = faker.datatype.uuid()
const CART_ID_2 = faker.datatype.uuid()

describe('In Memory Cart Store tests', () => {
  it('should add cart items to and load from different inventories (tenants)', async () => {
    const sut = new InMemoryCartStore()

    const cartItem1 = new CartItem(TENANT_ID, CART_ID, faker.datatype.uuid(), 1)
    const cartItem2 = new CartItem(TENANT_ID, CART_ID, faker.datatype.uuid(), 1)
    const cartItem3 = new CartItem(TENANT_ID, CART_ID, faker.datatype.uuid(), 1)
    await sut.save(cartItem1)
    await sut.save(cartItem2)
    await sut.save(cartItem3)

    const cartItem4 = new CartItem(TENANT_ID_2, CART_ID_2, faker.datatype.uuid(), 1)
    const cartItem5 = new CartItem(TENANT_ID_2, CART_ID_2, faker.datatype.uuid(), 1)
    const cartItem6 = new CartItem(TENANT_ID_2, CART_ID_2, faker.datatype.uuid(), 1)
    await sut.save(cartItem4)
    await sut.save(cartItem5)
    await sut.save(cartItem6)
  
    expect(sut.addCallsCount).toBe(6)

    const cart1 = await sut.loadAll(TENANT_ID, CART_ID)
    const cart2 = await sut.loadAll(TENANT_ID_2, CART_ID_2)

    expect(cart1).toHaveLength(3)
    expect(cart2).toHaveLength(3)
  })

})