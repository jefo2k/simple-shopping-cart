import { Product } from '../../domain/entities/product'

export interface ProductStore {
  save: (product: Product) => Promise<void>
  loadById: (productId: string) => Promise<Product>
}
