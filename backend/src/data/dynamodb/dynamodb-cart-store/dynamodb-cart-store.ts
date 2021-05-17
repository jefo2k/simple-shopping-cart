import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { CartItem } from '../../../domain/entities'
import { CartStore } from '../../ports'
import { createLogger } from '../../../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('Cart Dynamodb Store')

export class DynamodbCartStore implements CartStore {
  constructor (
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly cartsTable = process.env.CARTS_TABLE,
    private readonly cartsIndex = process.env.CARTS_INDEX_NAME
  ) {}

  async removeByProduct (cartId: string, productId: string): Promise<void> {
    logger.info('Remove cart from product: ', { cartId, productId })

    await this.docClient.delete({
      TableName: this.cartsTable,
      Key: {
        cartId,
        productId
      }
    }).promise()
  }

  async save (cartItem: CartItem): Promise<string> {
    logger.info('Persisting cart item')
    
    const cartItemData = {
      tenantId: cartItem.getTenantId(),
      cartId: cartItem.getCartId(),
      productId: cartItem.getProductId(),
      quantity: cartItem.getQuantity(),
      createdAt: cartItem.getCreatedAtISOStr(),
      updatedAt: cartItem.getUpdatedAtISOStr()
    }
    
    const result = await this.docClient.put({
      TableName: this.cartsTable,
      Item: cartItemData
    }).promise()

    const cartId = cartItem.getCartId()

    logger.info('Cart item persisted: ', { cartId })

    return cartItem.getCartId()
  }
  
  async update (changedCartItem: CartItem): Promise<string> {
    logger.info('Updating cart item')
    
    const cartId = changedCartItem.getCartId()
    const productId = changedCartItem.getProductId()
    const newQuantity = changedCartItem.getQuantity()
    const newUpdatedAt = changedCartItem.getUpdatedAtISOStr()

    const params = {
      TableName: this.cartsTable,
      Key: {
        cartId,
        productId
      },
      ExpressionAttributeValues: {
        ':quantity': newQuantity,
        ':updatedAt': newUpdatedAt
      },
      UpdateExpression: 'SET quantity = :quantity, updatedAt = :updatedAt',
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.docClient.update(params).promise()

    logger.info('Cart item updated: ', { cartId })

    return result.Attributes.cartId
  }
  
  async loadAll (tenantId: string, cartId: string): Promise<CartItem[]> {
    logger.info('Load all cart items from cart: ', { cartId })

    const result = await this.docClient.query({
      TableName: this.cartsTable,
      IndexName: this.cartsIndex,
      KeyConditionExpression: 'tenantId = :tenantId and cartId = :cartId',
      ExpressionAttributeValues: {
        ':tenantId': tenantId,
        ':cartId': cartId
      }
    }).promise()

    const cartItemList = result.Items
    return cartItemList as CartItem[]
  }

  async loadByProductId (cartId: string, productId: string): Promise<CartItem> {
    logger.info('Load cart item with product: ', { cartId, productId })

    const result = await this.docClient.query({
      TableName: this.cartsTable,
      KeyConditionExpression: 'cartId = :cartId and productId = :productId',
      ExpressionAttributeValues: {
        ':cartId': cartId,
        ':productId': productId
      }
    }).promise()

    if (result.Items && result.Items.length > 0) {
      const response = result.Items[0]
      return new CartItem(response.tenantId, response.cartId, response.productId, response.quantity)
    } else {
      return undefined
    }
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
