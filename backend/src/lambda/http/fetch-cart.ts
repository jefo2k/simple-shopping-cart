import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { LoadItemsFromCart } from '../../usecases/load-items-from-cart/load-items-from-cart'
import { makeLoadItemsFromCart } from '../../main/factories/make-load-items-from-cart'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Fetch Cart Lambda Function')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', { event })
  const loadItemsFromCartUc: LoadItemsFromCart = makeLoadItemsFromCart()

  const tenantId = event.pathParameters.tenantId
  const cartId = event.pathParameters.cartId

  try {
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
    logger.error('Error fetching cart', { error })
    throw new Error(error)
  }
}
