import { Product } from '../../domain/entities'
import { AddProduct } from '../ports'
import { ProductStore } from '../../data/ports'

export class AddProductOnCatalog implements AddProduct {
  constructor(
    private readonly productStore: ProductStore
  ) {}

  async add(product: Product): Promise<string> {
    const isProductAlreadyInCatalog = !!await this.productStore.loadById(product.getTenantId(), product.getProductId())

    if (isProductAlreadyInCatalog) {
      throw new Error('product already exists')
    }

    return await this.productStore.save(product)
  }

}
