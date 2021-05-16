import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { CartItem } from '../../../domain/entities'
import { CartStore } from '../../ports'

export class DynamodbCartStore implements CartStore {
  constructor (
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly cartTable = process.env.CART_TABLE,
    private readonly inventoryIndex = process.env.CART_INDEX_NAME
  ) {}

  async save (cartItem: CartItem): Promise<string> {
    const cartItemData = {
      tenantId: cartItem.getTenantId(),
      cartId: cartItem.getCartId(),
      productId: cartItem.getProductId(),
      quantity: cartItem.getQuantity(),
      createdAt: cartItem.getCreatedAtISOStr(),
      updatedAt: cartItem.getUpdatedAtISOStr()
    }
    const result = await this.docClient.put({
      TableName: this.cartTable,
      Item: cartItemData
    }).promise()

    console.log('### result: ', result)

    return cartItem.getCartId()
  }
  
  async update (changedCartItem: CartItem): Promise<string> {
    
    const cartId = changedCartItem.getCartId()
    const productId = changedCartItem.getProductId()
    const newQuantity = changedCartItem.getQuantity()
    const newUpdatedAt = changedCartItem.getUpdatedAtISOStr()

    const params = {
      TableName: this.cartTable,
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

    // return result.Attributes as TodoItem
    return result.Attributes.cartId
  }
  
  async loadAll (tenantId: string, cartId: string): Promise<CartItem[]> {
    const result = await this.docClient.query({
      TableName: this.cartTable,
      IndexName: this.inventoryIndex,
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
    const result = await this.docClient.query({
      TableName: this.cartTable,
      KeyConditionExpression: 'cartId = :cartId and productId = :productId',
      ExpressionAttributeValues: {
        ':cartId': cartId,
        ':productId': productId
      }
    }).promise()

    if (result.Items && result.Items.length > 0) {
      console.log('### result.Items: ', result.Items)
      const response = result.Items[0]
      console.log('### response: ', response)
      return new CartItem(response.tenantId, response.cartId, response.productId, response.quantity)
    } else {
      return undefined
    }

  }

}
