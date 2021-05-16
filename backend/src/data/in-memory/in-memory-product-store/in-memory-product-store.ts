import { ProductStore } from '../../ports/product-store'
import { Product } from '../../../domain/entities'

export class InMemoryProductStore implements ProductStore {
  addCallsCount = 0
  private catalog: Array<Product> = []
  
  async save (product: Product): Promise<string> {
    this.addCallsCount++
    this.catalog.push(product)
    return product.getProductId()
  }
  
  async loadById (tenantId: string, productId: string) {
    const product = this.catalog.find(p => p.getTenantId() === tenantId && p.getProductId() === productId)
    return product
  }
  
  async loadAll (tenantId: string): Promise<Product[]> {
    return this.catalog.filter(p => p.getTenantId() === tenantId)
  }
}