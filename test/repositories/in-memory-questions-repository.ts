import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((params.page - 1) * 20, params.page * 20)

    return questions
  }

  async findByID(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    return question ?? null
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    return question ?? null
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async save(question: Question): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )
    this.items[index] = question
  }

  async delete(question: Question): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )
    this.items.splice(index, 1)
    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
