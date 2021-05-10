import { Product } from '../../domain/entities/product'

export interface ProductStore {
  save: (product: Product) => Promise<void>
  loadById: (tenantId: string, productId: string) => Promise<Product>
  loadAll: (tenantId: string) => Promise<Product[]>
}
