import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { InventoryItem } from '../../../domain/entities'
import { InventoryStore } from '../../ports'
import { createLogger } from '../../../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('Inventory Dynamodb Store')

export class DynamodbInventoryStore implements InventoryStore {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly inventoryTable = process.env.INVENTORY_TABLE,
    // private readonly inventoryIndex = process.env.INVENTORY_INDEX_NAME
  ) {}

  save: (inventoryItem: InventoryItem) => Promise<void>
  
  async loadById (tenantId: string, productId: string): Promise<InventoryItem> {
    logger.info('Load inventory item : ', { productId })

    const result = await this.docClient.query({
      TableName: this.inventoryTable,
      // IndexName: this.inventoryIndex,
      KeyConditionExpression: 'tenantId = :tenantId and productId = :productId',
      ExpressionAttributeValues: {
        ':tenantId': tenantId,
        ':productId': productId
      }
    }).promise()

    const response = result.Items[0]
    // return productList[0] as InventoryItem
    return new InventoryItem(response.tenantId, response.productId, response.quantity)
  }

  async loadAll (tenantId: string): Promise<InventoryItem[]> {
    logger.info('Load all inventory items from tenant : ', { tenantId })

    const result = await this.docClient.query({
      TableName: this.inventoryTable,
      // IndexName: this.inventoryIndex,
      KeyConditionExpression: 'tenantId = :tenantId',
      ExpressionAttributeValues: {
        ':tenantId': tenantId
      }
    }).promise()

    const productList = result.Items
    return productList as InventoryItem[]
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