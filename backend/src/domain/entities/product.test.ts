import { Product } from '../../../src/domain/entities';

describe("Product entity tests", () => {
  const product = new Product('1', 'Product 1', 'Product 1 description')

  it("Smoking test: Mandatory fields getters must return correct values", () => {
    expect(product.getId()).toBe('1')
    expect(product.getName()).toBe('Product 1')
    expect(product.getDescription()).toBe('Product 1 description')
  })

  it("Smoking test: Setters must update values correctly", () => {
    product.setName('Product 1 updated v2')
    product.setDescription('Product 1 description updated v2')
    
    expect(product.getName()).toBe('Product 1 updated v2')
    expect(product.getDescription()).toBe('Product 1 description updated v2')
  })

  it("Update name or description must update updatedAt field", async () => {
    const productUpdatedAtBeforeChange = product.getUpdatedAt()
    // waits for 100 miliseconds
    await new Promise((r) => setTimeout(r, 100))
    product.setName('Product 1 updated v3')
    const productUpdatedAtAfterChange = product.getUpdatedAt()

    expect(productUpdatedAtBeforeChange.getTime()).not.toBe(productUpdatedAtAfterChange.getTime())
    expect(productUpdatedAtBeforeChange.getTime()).toBeLessThan(productUpdatedAtAfterChange.getTime())
  })

})