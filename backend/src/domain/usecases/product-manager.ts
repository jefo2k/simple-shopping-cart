
import { Product } from '../entities';

export interface ProductManager {
  add: (product: Product) => void
  load: () => void
}