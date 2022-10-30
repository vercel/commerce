import edgeHandler from '../utils/edge-handler'
import nodeHandler from '../utils/node-handler'

/**
 * Next.js Commerce API endpoints handler. Based on the path, it will call the corresponding endpoint handler,
 * exported from the `endpoints` folder of the provider.
 * @param {CommerceAPI} commerce The Commerce API instance.
 * @param endpoints An object containing the handlers for each endpoint.
 */
export default process.env.NEXT_RUNTIME === 'edge' ? edgeHandler : nodeHandler
