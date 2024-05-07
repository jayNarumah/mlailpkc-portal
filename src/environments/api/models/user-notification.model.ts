export interface UserNotificationResource {
    userNotification: {
        subject: string
        content: string
        is_read: boolean
        action_link: string
    }
}
