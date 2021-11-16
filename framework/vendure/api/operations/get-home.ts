import { OperationContext } from '@commerce/api/operations';
import { normalizeHome } from '@framework/utils/normalize';
import { Provider, VendureConfig } from '..';
import { GetHomeQuery, DataHome } from '../../schema';
import { getHomeQuery } from './../../utils/queries/get-home';


export type HomeVariables = {
 
}

export default function getHomeOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getHome(opts?: {
    variables?: HomeVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<DataHome | null>

  async function getHome({
    query = getHomeQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: HomeVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<DataHome | null> {
    
    const config = commerce.getConfig(cfg)
    const variables = {

    }
    const { data } = await config.fetch<GetHomeQuery>(query, {
      variables,
    })
  
    if(data.home){
      return normalizeHome(data.home);
    }else{
      return null
    }
   
  }

  return getHome
}
