import { InventoryItem } from '../../domain/entities'
import { AddInventoryItem } from '../ports'
import { InventoryStore } from '../../data/ports'
import { ProductStore } from '../../data/ports/product-store'

export class AddItemOnInventory implements AddInventoryItem {
  constructor(
    private readonly inventoryStore: InventoryStore,
    private readonly productStore: ProductStore
  ) {}

  async add(inventoryItem: InventoryItem): Promise<void> {
    // checks if product exists in catalog
    const tenantId = inventoryItem.getTenantId()
    const productId = inventoryItem.getProductId()
    const product = await this.productStore.loadById(tenantId, productId)

    if (!product) {
      throw new Error('product does not exist')
    }

    // checks if an inventory item already exists
    const item = await this.inventoryStore.loadById(tenantId, productId)
    if (item) {
      throw new Error('inventory item already exists')
    }

    await this.inventoryStore.save(inventoryItem)
  }
}