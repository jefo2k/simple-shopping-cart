import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Product } from '../../../domain/entities'
import { ProductStore } from '../../ports'


export class DynamodbProductStore implements ProductStore {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly productsTable = process.env.PRODUCTS_TABLE
  ) {}

  save: (product: Product) => Promise<string>
  
  async loadById (tenantId: string, productId: string): Promise<Product> {
    const result = await this.docClient.query({
      TableName: this.productsTable,
      KeyConditionExpression: 'tenantId = :tenantId and productId = :productId',
      ExpressionAttributeValues: {
        ':tenantId': tenantId,
        ':productId': productId
      }
    }).promise()

    console.info('result.Items: ', result.Items)

    const productList = result.Items
    return productList[0] as Product
  }

  async loadAll (tenantId: string): Promise<Product[]> {
    const result = await this.docClient.query({
      TableName: this.productsTable,
      KeyConditionExpression: 'tenantId = :tenantId',
      ExpressionAttributeValues: {
        ':tenantId': tenantId
      }
    }).promise()

    const productList = result.Items
    return productList as Product[]
  }
  
}
