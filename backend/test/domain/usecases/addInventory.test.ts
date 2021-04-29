import { Inventory, Product } from "../../../src/domain/entities"
import { InventoryItem } from '../../../src/domain/entities/inventory';

describe("add inventory use case tests", () => {
  const inventory = new Inventory()
  const product = new Product('1', 'product 1', 'product 1 description')

  it("It should create a inventory item", () => {
    const inventoryItem = <InventoryItem>{ productId: product.getId(), quantity: 10 }
    inventory.add(inventoryItem)
    expect(true).toBeTruthy
    
  })

})