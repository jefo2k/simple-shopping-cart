import { LoadProducts } from '../ports'
import { ProductStore } from '../../data/ports'
import { Product } from '../../domain/entities'

export class LoadProductsFromCatalog implements LoadProducts {
  constructor(
    private readonly productStore: ProductStore
  ) {}

  async load(tenantId: string): Promise<Product[]> {
    return await this.productStore.loadAll(tenantId)
  }
}
