import { LoadProductsFromCatalog } from '../../usecases'
import { DynamodbProductStore } from '../../data/dynamodb/dynamodb-product-store'

export const makeLoadProductsFromCatalog = (): LoadProductsFromCatalog => {
  const productStore = new DynamodbProductStore()
  
  const loadProductsFromcatalog = new LoadProductsFromCatalog(productStore)
  
  return loadProductsFromcatalog
}