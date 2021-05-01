import { LoadProducts } from '../ports'
import { ProductStore } from '../../data/ports'

export class LoadProductsFromCatalog implements LoadProducts {
  constructor(
    private readonly ProductStore: ProductStore
  ) {}

  load() {}
}
