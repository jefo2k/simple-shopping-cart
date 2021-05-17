import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { LoadProducts } from '../../usecases/ports/load-products'
import { makeLoadProductsFromCatalog } from '../../main/factories/make-load-products-from-catalog'
import { createLogger } from '../../utils/logger';

const logger = createLogger('Load products Lambda Function')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', { event })

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
    logger.error('Error loading products', { error })
    throw new Error(error)
  }
}