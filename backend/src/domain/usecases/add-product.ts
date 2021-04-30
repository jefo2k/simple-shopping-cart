import { Product } from '../entities'

export interface addProduct {
  add: (product: Product) => void
}