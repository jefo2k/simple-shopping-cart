import { Product } from '../../domain/entities'

export interface LoadProducts {
  load: () => Promise<Product[]>
}
