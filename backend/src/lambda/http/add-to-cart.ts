import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { AddItemToCart } from '../../usecases'
import { makeAddItemToCart } from '../../main/factories/make-add-item-to-cart'
import { AddToCartDto } from '../../dtos'
import { LoadItemsFromCart } from '../../usecases/load-items-from-cart/load-items-from-cart';
import { makeLoadItemsFromCart } from '../../main/factories/make-load-items-from-cart';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
    throw new Error(error)
  }
}