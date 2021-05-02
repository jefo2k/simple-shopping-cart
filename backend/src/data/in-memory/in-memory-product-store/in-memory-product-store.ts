import { ProductStore } from '../../ports/product-store'
import { Product } from '../../../domain/entities'

export class InMemoryProductStore implements ProductStore {
  addCallsCount = 0
  private catalog: Array<Product> = []
  
  async save (product: Product): Promise<void> {
    this.catalog.push(product)
    this.addCallsCount++
  }
  
  async loadById (productId: string) {
    const product = this.catalog.find(p => p.getId() === productId)
    return product
  }
  
  async loadAll (): Promise<Product[]> {
    return this.catalog
  }
}