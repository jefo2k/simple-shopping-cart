import { LoadProducts } from '../../usecases/ports/load-products'
import { makeLoadProductsFromCatalog } from './make-load-products-from-catalog'
import { LoadProductsFromCatalog } from '../../usecases'

describe('MakeLoadProductsFromCatalog factory tests', () => {
  it('should receive a use case type', () => {
    const loadProductFromCatalog: LoadProducts = makeLoadProductsFromCatalog()

    expect(loadProductFromCatalog).toBeInstanceOf(LoadProductsFromCatalog)
  })

  it('should have loaded products', async () => {
    const loadProductFromCatalog: LoadProducts = makeLoadProductsFromCatalog()
    const productList = await loadProductFromCatalog.load()

    expect(productList).toHaveLength(3)
  })

})