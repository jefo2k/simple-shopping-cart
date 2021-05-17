import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { AddItemToCart, LoadItemsFromCart } from '../../usecases'
import { makeAddItemToCart } from '../../main/factories/make-add-item-to-cart'
import { makeLoadItemsFromCart } from '../../main/factories/make-load-items-from-cart'
import { AddToCartDto } from '../../dtos'
import { createLogger } from '../../utils/logger';

const logger = createLogger('Add to Cart Lambda Function')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', { event })

  const addItemToCartUc: AddItemToCart = makeAddItemToCart()
  const loadItemsFromCartUc: LoadItemsFromCart = makeLoadItemsFromCart()

  const tenantId = event.pathParameters.tenantId
  const addToCartDto: AddToCartDto = JSON.parse(event.body)

  try {
    const cartId = await addItemToCartUc.add(addToCartDto, tenantId)
    const cartItems = await loadItemsFromCartUc.load(tenantId, cartId)
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        cart: {
          id: cartId,
          items: cartItems
        }
      }, null, 2)
    }
  } catch (error) {
    logger.error('Error saving cart', { error })
    throw new Error(error)
  }
}