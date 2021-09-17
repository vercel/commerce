import { gateway as MoltinGateway, Moltin } from '@moltin/sdk';

let client:any = MoltinGateway({
  client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID
});

client.PCM.endpoint = 'catalog/products';

export default client;