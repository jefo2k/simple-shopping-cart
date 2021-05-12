import { Product } from '../../domain/entities'

export interface AddProduct {
  add: (product: Product) => void
}