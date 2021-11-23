import { Seo } from '../../vendure/schema';

export type GetSEOByPageOperation = {
    data: { SEOByPage?: Seo }
    variables: {
       page:string
    }
}
