import { MarkNotificationsAsReadMutation, UpdateNotificationInput } from '@framework/schema'
import { markNotificationsAsReadMutation } from '@framework/utils/mutations/mark-notification-as-read-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useNewNotifications } from '.'


const useMarkNotificationsAsRead = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useNewNotifications()

  const markNotificationsAsRead = (input: UpdateNotificationInput,
    fCallBack?: (isSuccess: boolean, message?: string) => void) => {
    setError(null)
    setLoading(true)
    rawFetcher<MarkNotificationsAsReadMutation>({
      query: markNotificationsAsReadMutation,
      variables: { input },
    })
      .then(({ data }) => {
        if (data.markNotificationsAsRead.updatedNotificationOrderIds) {
          fCallBack && fCallBack(true)
          mutate()
        }
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => setLoading(false))
  }

  return { loading, markNotificationsAsRead, error }
}

export default useMarkNotificationsAsRead
