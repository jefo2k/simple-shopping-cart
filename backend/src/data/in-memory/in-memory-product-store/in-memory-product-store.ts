import { ProductStore } from '../../ports/product-store'
import { Product } from '../../../domain/entities'

export class InMemoryProductStore implements ProductStore {
  addCallsCount = 0
  private catalog: Array<Product> = []
  
  async save (product: Product): Promise<void> {
    this.catalog.push(product)
    this.addCallsCount++
  }
  
  async loadById (tenantId: string, productId: string) {
    const product = this.catalog.find(p => p.getTenantId() === tenantId && p.getId() === productId)
    return product
  }
  
  async loadAll (tenantId: string): Promise<Product[]> {
    return this.catalog.filter(p => p.getTenantId() === tenantId)
  }
}