import { Product } from '../../domain/entities'
import { AddProduct } from '../ports'
import { ProductStore } from '../../data/ports'

export class AddProductOnCatalog implements AddProduct {
  constructor(
    private readonly ProductStore: ProductStore
  ) {}

  async save(): Promise<void> {
    this.ProductStore.save()
  }
  
  add(_: Product) {}

}

