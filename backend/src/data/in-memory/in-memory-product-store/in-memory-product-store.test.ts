import { InMemoryProductStore } from './in-memory-product-store'
import { AddProductOnCatalog } from '../../../usecases'
import { Product } from '../../../domain/entities'
import * as faker from 'faker'

const TENANT_ID = faker.datatype.uuid()
const TENANT_ID_2 = faker.datatype.uuid()

describe('In Memory Product Store tests', () => {

  it('should add products to and load from different catalogs (tenants)', async () => {
    const sut = new InMemoryProductStore()
    const addProductInCatalogUC = new AddProductOnCatalog(sut)

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
    
    const productListTenant1 = await sut.loadAll(TENANT_ID)
    const productListTenant2 = await sut.loadAll(TENANT_ID_2)

    expect(sut.addCallsCount).toBe(6)
    expect(productListTenant1).toHaveLength(3)
    expect(productListTenant2).toHaveLength(3)
  })

})