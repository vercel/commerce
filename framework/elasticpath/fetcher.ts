import type { Fetcher } from '@commerce/utils/types'
import { FetcherError } from '@commerce/utils/errors'
import epClient from './utils/ep-client'

export const fetcher: Fetcher = async ({
  url,
  method = 'POST',
  variables:{params}
}) => {
  if(url && method) {
    try {


      let res = await epClient[url][method](...params);
      
      if(res.errors && res.errors > 0) {
        let error = res.errors[0];
        throw new FetcherError({ 
          message: error.detail, 
          status: error.status 
        });
      }
      return res;
    } catch(err) {

      console.log(err);

      throw new FetcherError({ 
        message: "Malformed request", 
        status: 400
      });
    }
  }
  throw new FetcherError({ 
    message: "Malformed request", 
    status: 400
  });
}
