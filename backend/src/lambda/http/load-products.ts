import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { LoadProducts } from '../../usecases/ports/load-products'
import { makeLoadProductsFromCatalog } from '../../main/factories/make-load-products-from-catalog'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const loadProductFromCatalog: LoadProducts = makeLoadProductsFromCatalog()
  const tenantId = event.pathParameters.tenantId

  try {
    const productList = await loadProductFromCatalog.load(tenantId)
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        items: productList
      }, null, 2)
    }
  } catch (error) {
    throw new Error(error)
  }
}