import { GetAvailableCountriesQuery } from '@framework/schema'
import { availableCountriesQuery } from '@framework/utils/queries/available-countries-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useAvailableCountries = () => {
  const { data, isValidating } = useSWR<GetAvailableCountriesQuery>([availableCountriesQuery], gglFetcher)
  return {
      countries: data?.availableCountries,
      loading: isValidating,
  }
} 

export default useAvailableCountries
