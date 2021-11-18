export const newNotificationsQuery = /* GraphQL */ `
query newNotifications($customOption: CustomNotificationListOptions) {
  newNotifications(customOption: $customOption) {
    totalItems
    items {
      id
      createdAt
      type
      data
      description
      isNew
      order {
        id
        code
        customFields {
          lastedNotificationAt
        }
      }
    }
  }
}
`

export const notificationsQuery = /* GraphQL */ `
query notifications($customOption: CustomNotificationListOptions) {
  notifications(customOption: $customOption) {
    totalItems
    items {
      id
      createdAt
      type
      data
      description
      isNew
      order {
        id
        code
        state
        customFields {
          lastedNotificationAt
        }
      }
    }
  }
}
`
