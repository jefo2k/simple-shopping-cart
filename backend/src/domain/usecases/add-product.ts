import { Product } from '../entities'

export interface AddProduct {
  add: (product: Product) => void
}