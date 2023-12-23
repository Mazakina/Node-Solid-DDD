import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  // sut =system under test
  it('should be able to delete a question', async () => {
    const question = makeQuestion()
    inMemoryQuestionsRepository.create(question)
    inMemoryQuestionsRepository.create(makeQuestion())

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
    })
    expect(inMemoryQuestionsRepository.items.length).toEqual(1)
  })

  it('should not be able to delete a question from another user', async () => {
    const question = makeQuestion()
    inMemoryQuestionsRepository.create(question)
    inMemoryQuestionsRepository.create(makeQuestion())

    const result = await sut.execute({
      questionId: question.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
