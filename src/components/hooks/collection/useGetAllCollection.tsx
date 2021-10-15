import { GetCollectionsQuery } from '@framework/schema';
import { getCollectionsNameQuery } from '@framework/utils/queries/get-collections-query';
import gglFetcher from 'src/utils/gglFetcher';
import useSWR from 'swr';


const useGetAllCollection =  () => {
    const { data, isValidating, ...rest } =  useSWR<GetCollectionsQuery>([getCollectionsNameQuery], gglFetcher)
    return { collections: data?.collections.items || [], loading: isValidating, ...rest }
}

export default useGetAllCollection;