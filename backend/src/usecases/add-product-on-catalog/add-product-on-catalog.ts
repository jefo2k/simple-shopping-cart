import { Product } from '../../domain/entities'
import { AddProduct } from '../ports'
import { ProductStore } from '../../data/ports'

export class AddProductOnCatalog implements AddProduct {
  constructor(
    private readonly productStore: ProductStore
  ) {}

  async add(product: Product): Promise<void> {
    const isProductAlreadyInCatalog = !!await this.productStore.loadById(product.getId())

    if (isProductAlreadyInCatalog) {
      throw new Error('product already exists')
    }

    this.productStore.save(product)
  }

}
