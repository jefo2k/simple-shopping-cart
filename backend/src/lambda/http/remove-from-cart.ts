import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { RemoveItemFromCart, LoadItemsFromCart } from '../../usecases'
import { makeLoadItemsFromCart } from '../../main/factories/make-load-items-from-cart'
import { makeRemoveItemFromCart } from '../../main/factories/make-remove-from-cart-from-cart'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
    throw new Error(error)
  }
}
