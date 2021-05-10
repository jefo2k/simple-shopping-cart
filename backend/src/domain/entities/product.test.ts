import { Product } from '.'
import * as faker from 'faker'

describe('Product entity tests', () => {
  it('Should not instantiate a product with an empty id', () => {
    expect(() => {
      new Product('', faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    }).toThrowError('invalid id, must not be empty')

    expect(() => {
      new Product(' ', faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    }).toThrowError('invalid id, must not be empty')

    expect(() => {
      new Product(undefined, faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    }).toThrowError('invalid id, must not be empty')

    expect(() => {
      new Product(null, faker.commerce.productName(), faker.commerce.productDescription(), faker.image.imageUrl())
    }).toThrowError('invalid id, must not be empty')
  })

  it('Should not instantiate a product with an empty name', () => {
    expect(() => {
      new Product(faker.datatype.uuid(), '', faker.commerce.productDescription(), faker.image.imageUrl())
    }).toThrowError('invalid name, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), ' ', faker.commerce.productDescription(), faker.image.imageUrl())
    }).toThrowError('invalid name, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), undefined, faker.commerce.productDescription(), faker.image.imageUrl())
    }).toThrowError('invalid name, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), null, faker.commerce.productDescription(), faker.image.imageUrl())
    }).toThrowError('invalid name, must not be empty')
  })

  it('Should not instantiate a product with name length greater than 60', () => {
    expect(() => {
      new Product(
        faker.datatype.uuid(), 
        '1234567890123456789012345678901234567890123456789012345678901',
        faker.commerce.productName(),
        faker.image.imageUrl()
      )
    }).toThrowError('invalid name, has more than 60 chars')
  })

  it('Should not instantiate a product with an empty description', () => {
    expect(() => {
      new Product(faker.datatype.uuid(), faker.commerce.productName(), '', faker.image.imageUrl())
    }).toThrowError('invalid description, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), faker.commerce.productName(), ' ', faker.image.imageUrl())
    }).toThrowError('invalid description, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), faker.commerce.productName(), undefined, faker.image.imageUrl())
    }).toThrowError('invalid description, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), faker.commerce.productName(), null, faker.image.imageUrl())
    }).toThrowError('invalid description, must not be empty')
  })

  it('Should not instantiate a product with description length greater than 255', () => {
    expect(() => {
      new Product(
        faker.datatype.uuid(), 
        faker.commerce.productName(),
        `12345678901234567890123456789012345678901234567890\
         12345678901234567890123456789012345678901234567890\
         12345678901234567890123456789012345678901234567890\
         12345678901234567890123456789012345678901234567890\
         12345678901234567890123456789012345678901234567890\
         123456`.replace(/  +/g, ''), 
         faker.image.imageUrl()
      )
    }).toThrowError('invalid description, has more than 255 chars')
  })

  it('Should not instantiate a product with an empty thumbUrl', () => {
    expect(() => {
      new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), '')
    }).toThrowError('invalid thumb Url, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), ' ')
    }).toThrowError('invalid thumb Url, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), undefined)
    }).toThrowError('invalid thumb Url, must not be empty')

    expect(() => {
      new Product(faker.datatype.uuid(), faker.commerce.productName(), faker.commerce.productDescription(), null)
    }).toThrowError('invalid thumb Url, must not be empty')
  })

  it('Should not instantiate a product with a invalid thumbUrl', () => {
    expect(() => {
      new Product(
        faker.datatype.uuid(), 
        faker.commerce.productName(),
        faker.commerce.productDescription(), 
        'an invalid url'
      )
    }).toThrowError('invalid thumb Url, not a valid url')
  })

  const productId = faker.datatype.uuid()
  const productName = faker.commerce.productName()
  const productDescription = faker.commerce.productDescription()
  const productThumbUrl = faker.image.imageUrl()
  const product = new Product(productId, productName, productDescription, productThumbUrl)

  it('Smoking test: Mandatory fields getters must return correct values', () => {
    expect(product.getId()).toBe(productId)
    expect(product.getName()).toBe(productName)
    expect(product.getDescription()).toBe(productDescription)
    expect(product.getThumbUrl()).toBe(productThumbUrl)
  })

  it('Smoking test: Setters must update values correctly', () => {
    const newProductName = faker.commerce.productName()
    const newProductDescription = faker.commerce.productDescription()
    product.setName(newProductName)
    product.setDescription(newProductDescription)
    
    expect(product.getName()).toBe(newProductName)
    expect(product.getDescription()).toBe(newProductDescription)
  })

  it('Update name or description must update updatedAt field', async () => {
    const productUpdatedAtBeforeChange = product.getUpdatedAt()
    // waits for 100 miliseconds
    await new Promise((r) => setTimeout(r, 100))
    product.setName(faker.commerce.productName())
    const productUpdatedAtAfterChange = product.getUpdatedAt()

    expect(productUpdatedAtBeforeChange.getTime()).not.toBe(productUpdatedAtAfterChange.getTime())
    expect(productUpdatedAtBeforeChange.getTime()).toBeLessThan(productUpdatedAtAfterChange.getTime())
  })

})