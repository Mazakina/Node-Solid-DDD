import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  // sut =system under test
  it('should be able to delete a answer', async () => {
    const answer = makeAnswer()
    inMemoryAnswersRepository.create(answer)
    inMemoryAnswersRepository.create(makeAnswer())

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })
    expect(inMemoryAnswersRepository.items.length).toEqual(1)
  })

  it('should not be able to delete a answer from another user', async () => {
    const answer = makeAnswer()
    inMemoryAnswersRepository.create(answer)
    inMemoryAnswersRepository.create(makeAnswer())

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
