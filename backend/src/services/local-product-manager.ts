import { Product } from '../domain/entities'
import { AddProduct, LoadProduct } from '../domain/usecases'
import { ProductStore } from '../data/ports'

export class LocalProductManager implements AddProduct, LoadProduct {
  constructor(
    private readonly ProductStore: ProductStore
  ) {}

  async save(): Promise<void> {
    this.ProductStore.save()
  }
  
  add(_: Product) {}
  
  load() {}
}

