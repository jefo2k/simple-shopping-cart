import { LoadProductsFromCatalog } from '../../usecases'
import { InMemoryProductStore } from '../../data/in-memory-product-store';
import { Product } from '../../domain/entities/product';

export const makeLoadProductsFromCatalog = (): LoadProductsFromCatalog => {
  const productStore = new InMemoryProductStore()

  // load default products
  Promise.all(
    productListDefault.map(async (productParams) => {
      const { id, name, description} = productParams
      const product = new Product(id, name, description)
      await productStore.save(product)
    })
  )
  
  const loadProductsFromcatalog = new LoadProductsFromCatalog(productStore)
  return loadProductsFromcatalog
}

const productListDefault: ProductParamsType[] = [
  {
    id: '5ecfe430-d635-4139-ae6c-8606c2aacbf8',
    name: 'Product 1',
    description: 'Product 1 short description'
  },
  {
    id: '24090f30-d91c-48c0-bda9-137bba54dd23',
    name: 'Product 2',
    description: 'Product 2 short description'
  },
  {
    id: 'd2559eb9-d286-4c93-bbab-dc01f275f375',
    name: 'Product 3',
    description: 'Product 3 short description'
  }
]

type ProductParamsType = {
  id: string,
  name: string,
  description: string
}

/**
 * 
5ecfe430-d635-4139-ae6c-8606c2aacbf8
24090f30-d91c-48c0-bda9-137bba54dd23
d2559eb9-d286-4c93-bbab-dc01f275f375
dea0eace-9c41-4d46-a4ed-0b6f2f41c2c2
c94abd25-ec4b-4bbb-9966-a8d6cf84317f
5569dc2f-1542-4795-8454-41e8c403ff31
73906c5a-ec33-4d2a-83af-3f36f16493dd
4f57c0bd-35ce-404c-b7bd-1eaf2e8c70fc
0e9df1c6-558e-42cd-b860-29a3483e9194
df44a2b1-d13a-4a4e-a27d-205a032c5038
 */