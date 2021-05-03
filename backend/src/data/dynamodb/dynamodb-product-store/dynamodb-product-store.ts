import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Product } from '../../../domain/entities'
import { ProductStore } from '../../ports/product-store'


export class DynamodbProductStore implements ProductStore {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly productsTable = process.env.PRODUCTS_TABLE
  ) {}

  save: (product: Product) => Promise<void>
  loadById: (productId: string) => Promise<Product>
  
  async loadAll (): Promise<Product[]> {
    const result = await this.docClient.scan({
      TableName: this.productsTable
    }).promise()

    const productList = result.Items
    return productList as Product[]
  }
}
