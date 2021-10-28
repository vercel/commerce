export const markNotificationsAsReadMutation = /* GraphQL */ `
mutation markNotificationsAsRead ($input:  UpdateNotificationInput!) {
  markNotificationsAsRead(input: $input) {
    updatedNotificationOrderIds
  }
}
`
