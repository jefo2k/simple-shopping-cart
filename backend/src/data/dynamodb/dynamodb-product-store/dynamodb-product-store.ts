import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Product } from '../../../domain/entities'
import { ProductStore } from '../../ports'
import { createLogger } from '../../../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('Product Dynamodb Store')

export class DynamodbProductStore implements ProductStore {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly productsTable = process.env.PRODUCTS_TABLE
  ) {}

  save: (product: Product) => Promise<string>
  
  async loadById (tenantId: string, productId: string): Promise<Product> {
    logger.info('Load product : ', { productId })

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
    logger.info('Load all products from tenant : ', { tenantId })

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

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
