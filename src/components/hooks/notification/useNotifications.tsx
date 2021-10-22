import { NotificationsQuery, QueryNotificationsArgs } from '@framework/schema'
import { notificationsQuery } from '@framework/utils/queries/notification-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useNotifications = (options?: QueryNotificationsArgs) => {
  const { data, isValidating, ...rest } = useSWR<NotificationsQuery>([notificationsQuery, options], gglFetcher)
  console.log("data: ", data)
  return { notifications: data?.notifications?.items, total: data?.notifications?.totalItems, loading: isValidating, ...rest }
}

export default useNotifications
