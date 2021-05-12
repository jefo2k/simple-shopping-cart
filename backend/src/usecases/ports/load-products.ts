import { Product } from '../../domain/entities'

export interface LoadProducts {
  load: (tenantId: string) => Promise<Product[]>
}
