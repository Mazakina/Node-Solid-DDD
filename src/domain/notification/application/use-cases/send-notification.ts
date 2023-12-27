import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'

interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    content,
    recipientId,
    title,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      content,
      recipientId: new UniqueEntityID(recipientId),
      title,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
