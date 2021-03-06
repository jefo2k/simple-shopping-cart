import { Product, InventoryItem } from '../../../domain/entities'
import { AddProductOnCatalog, AddItemOnInventory, LoadProductsFromCatalog } from '../../../usecases'
import { InMemoryProductStore } from '../in-memory-product-store'
import { InMemoryInventoryStore } from './in-memory-inventory-store'
import * as faker from 'faker'

const TENANT_ID = faker.datatype.uuid()
const TENANT_ID_2 = faker.datatype.uuid()

describe('In Memory Inventory Store tests', () => {
  it('should add inventory items to and load from different inventories (tenants)', async () => {
    const productStore = new InMemoryProductStore()
    const addProductInCatalogUC = new AddProductOnCatalog(productStore)

    const loadProductsFromCatalogUc = new LoadProductsFromCatalog(productStore)
    
    const sut = new InMemoryInventoryStore()

    const addInventoryItemInCatalogUC = new AddItemOnInventory(sut, loadProductsFromCatalogUc)

    const product1 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product2 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product3 = new Product(TENANT_ID, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await addProductInCatalogUC.add(product1)
    await addProductInCatalogUC.add(product2)
    await addProductInCatalogUC.add(product3)
    
    const product4 = new Product(TENANT_ID_2, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product5 = new Product(TENANT_ID_2, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    const product6 = new Product(TENANT_ID_2, faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    await addProductInCatalogUC.add(product4)
    await addProductInCatalogUC.add(product5)
    await addProductInCatalogUC.add(product6)

    const inventoryItem1 = new InventoryItem(TENANT_ID, product1.getProductId(), 50)
    const inventoryItem2 = new InventoryItem(TENANT_ID, product2.getProductId(), 50)
    const inventoryItem3 = new InventoryItem(TENANT_ID, product3.getProductId(), 50)
    await addInventoryItemInCatalogUC.add(inventoryItem1)
    await addInventoryItemInCatalogUC.add(inventoryItem2)
    await addInventoryItemInCatalogUC.add(inventoryItem3)

    const inventoryItem4 = new InventoryItem(TENANT_ID_2, product4.getProductId(), 50)
    const inventoryItem5 = new InventoryItem(TENANT_ID_2, product5.getProductId(), 50)
    const inventoryItem6 = new InventoryItem(TENANT_ID_2, product6.getProductId(), 50)
    await addInventoryItemInCatalogUC.add(inventoryItem4)
    await addInventoryItemInCatalogUC.add(inventoryItem5)
    await addInventoryItemInCatalogUC.add(inventoryItem6)

    const inventoryList1 = await sut.loadAll(TENANT_ID)
    const inventoryList2 = await sut.loadAll(TENANT_ID_2)

    expect(sut.addCallsCount).toBe(6)
    expect(inventoryList1).toHaveLength(3)
    expect(inventoryList2).toHaveLength(3)
  })

})