import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Product } from '../../../domain/entities'
import { ProductStore } from '../../ports/product-store'


export class DynamodbProductStore implements ProductStore {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly productsTable = process.env.PRODUCTS_TABLE,
    private readonly productsIndex = process.env.PRODUCTS_INDEX_NAME
  ) {}

  save: (product: Product) => Promise<void>
  loadById: (tenantId: string, productId: string) => Promise<Product>

  async loadAll (tenantId: string): Promise<Product[]> {
    const result = await this.docClient.query({
      TableName: this.productsTable,
      IndexName: this.productsIndex,
      KeyConditionExpression: 'tenantId = :tenantId',
      ExpressionAttributeValues: {
        ':tenantId': tenantId
      }
    }).promise()

    const productList = result.Items
    return productList as Product[]
  }
  
}
