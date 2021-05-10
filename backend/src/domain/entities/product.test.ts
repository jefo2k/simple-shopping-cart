import { Product } from '.'

describe('Product entity tests', () => {
  it('Should not instantiate a product with an empty id', () => {
    expect(() => {
      new Product('', 'product 1', 'product 1 description', 'non valid url')
    }).toThrowError('invalid id, must not be empty')

    expect(() => {
      new Product(' ', 'product 1', 'product 1 description', 'non valid url')
    }).toThrowError('invalid id, must not be empty')

    expect(() => {
      new Product(undefined, 'product 1', 'product 1 description', 'non valid url')
    }).toThrowError('invalid id, must not be empty')

    expect(() => {
      new Product(null, 'product 1', 'product 1 description', 'non valid url')
    }).toThrowError('invalid id, must not be empty')
  })

  it('Should not instantiate a product with an empty name', () => {
    expect(() => {
      new Product('1', '', 'product 1 description', 'non valid url')
    }).toThrowError('invalid name, must not be empty')

    expect(() => {
      new Product('1', ' ', 'product 1 description', 'non valid url')
    }).toThrowError('invalid name, must not be empty')

    expect(() => {
      new Product('1', undefined, 'product 1 description', 'non valid url')
    }).toThrowError('invalid name, must not be empty')

    expect(() => {
      new Product('1', null, 'product 1 description', 'non valid url')
    }).toThrowError('invalid name, must not be empty')
  })

  it('Should not instantiate a product with name length greater than 60', () => {
    expect(() => {
      new Product(
        '1', 
        '1234567890123456789012345678901234567890123456789012345678901',
        'Product 1 description',
        'non valid url'
      )
    }).toThrowError('invalid name, has more than 60 chars')
  })

  it('Should not instantiate a product with an empty description', () => {
    expect(() => {
      new Product('1', 'product 1', '', 'non valid url')
    }).toThrowError('invalid description, must not be empty')

    expect(() => {
      new Product('1', 'product 1', ' ', 'non valid url')
    }).toThrowError('invalid description, must not be empty')

    expect(() => {
      new Product('1', 'product 1', undefined, 'non valid url')
    }).toThrowError('invalid description, must not be empty')

    expect(() => {
      new Product('1', 'product 1', null, 'non valid url')
    }).toThrowError('invalid description, must not be empty')
  })

  it('Should not instantiate a product with description length greater than 255', () => {
    expect(() => {
      new Product(
        '1', 
        'product 1',
        `12345678901234567890123456789012345678901234567890\
         12345678901234567890123456789012345678901234567890\
         12345678901234567890123456789012345678901234567890\
         12345678901234567890123456789012345678901234567890\
         12345678901234567890123456789012345678901234567890\
         123456`.replace(/  +/g, ''), 
         'non valid url'
      )
    }).toThrowError('invalid description, has more than 255 chars')
  })

  const product = new Product('1', 'Product 1', 'Product 1 description', 'non valid url')

  it('Smoking test: Mandatory fields getters must return correct values', () => {
    expect(product.getId()).toBe('1')
    expect(product.getName()).toBe('Product 1')
    expect(product.getDescription()).toBe('Product 1 description')
  })

  it('Smoking test: Setters must update values correctly', () => {
    product.setName('Product 1 updated v2')
    product.setDescription('Product 1 description updated v2')
    
    expect(product.getName()).toBe('Product 1 updated v2')
    expect(product.getDescription()).toBe('Product 1 description updated v2')
  })

  it('Update name or description must update updatedAt field', async () => {
    const productUpdatedAtBeforeChange = product.getUpdatedAt()
    // waits for 100 miliseconds
    await new Promise((r) => setTimeout(r, 100))
    product.setName('Product 1 updated v3')
    const productUpdatedAtAfterChange = product.getUpdatedAt()

    expect(productUpdatedAtBeforeChange.getTime()).not.toBe(productUpdatedAtAfterChange.getTime())
    expect(productUpdatedAtBeforeChange.getTime()).toBeLessThan(productUpdatedAtAfterChange.getTime())
  })

})