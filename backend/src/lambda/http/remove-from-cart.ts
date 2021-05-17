import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { RemoveItemFromCart, LoadItemsFromCart } from '../../usecases'
import { makeLoadItemsFromCart } from '../../main/factories/make-load-items-from-cart'
import { makeRemoveItemFromCart } from '../../main/factories/make-remove-from-cart-from-cart'
import { createLogger } from '../../utils/logger';

const logger = createLogger('Remove From Cart Lambda Function')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', { event })

  const removeItemFromCartUc: RemoveItemFromCart = makeRemoveItemFromCart()
  const loadItemsFromCartUc: LoadItemsFromCart = makeLoadItemsFromCart()

  const tenantId = event.pathParameters.tenantId
  const cartId = event.pathParameters.cartId
  const productId = event.pathParameters.productId

  try {
    await removeItemFromCartUc.remove(cartId, productId)
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
    logger.error('Error trying to remove item from cart', { error })
    throw new Error(error)
  }
}
