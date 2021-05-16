import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { InventoryItem } from '../../../domain/entities'
import { InventoryStore } from '../../ports'

export class DynamodbInventoryStore implements InventoryStore {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly inventoryTable = process.env.INVENTORY_TABLE,
    // private readonly inventoryIndex = process.env.INVENTORY_INDEX_NAME
  ) {}

  save: (inventoryItem: InventoryItem) => Promise<void>
  
  async loadById (tenantId: string, productId: string): Promise<InventoryItem> {
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
