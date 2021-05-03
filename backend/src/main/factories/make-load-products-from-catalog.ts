import { LoadProductsFromCatalog } from '../../usecases'
import { DynamodbProductStore } from '../../data/dynamodb/dynamodb-product-store'

export const makeLoadProductsFromCatalog = (): LoadProductsFromCatalog => {
  const productStore = new DynamodbProductStore()

  // load default products
  // Promise.all(
  //   productListDefault.map(async (productParams) => {
  //     const { id, name, description} = productParams
  //     const product = new Product(id, name, description)
  //     await productStore.save(product)
  //   })
  // )
  
  const loadProductsFromcatalog = new LoadProductsFromCatalog(productStore)
  return loadProductsFromcatalog
}

// const productListDefault: ProductParamsType[] = [
//   {
//     id: '5ecfe430-d635-4139-ae6c-8606c2aacbf8',
//     name: 'Product 1',
//     description: 'Product 1 short description'
//   },
//   {
//     id: '24090f30-d91c-48c0-bda9-137bba54dd23',
//     name: 'Product 2',
//     description: 'Product 2 short description'
//   },
//   {
//     id: 'd2559eb9-d286-4c93-bbab-dc01f275f375',
//     name: 'Product 3',
//     description: 'Product 3 short description'
//   }
// ]

// type ProductParamsType = {
//   id: string,
//   name: string,
//   description: string
// }