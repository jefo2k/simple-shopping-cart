import { Product } from '../../domain/entities'

export interface LoadProducts {
  load: (tenantId: string) => Promise<Product[]>
  loadById: (tenantId: string, inventoryItemId: string) => Promise<Product>
}
