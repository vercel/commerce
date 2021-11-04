import { NewNotificationsQuery, QueryNotificationsArgs } from '@framework/schema'
import { newNotificationsQuery } from '@framework/utils/queries/notification-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useNewNotifications = (options?: QueryNotificationsArgs) => {
  const { data, isValidating, ...rest } = useSWR<NewNotificationsQuery>([newNotificationsQuery, options], gglFetcher)
  return { newNotifications: data?.newNotifications?.items, total: data?.newNotifications?.totalItems, loading: isValidating, ...rest }
}

export default useNewNotifications
