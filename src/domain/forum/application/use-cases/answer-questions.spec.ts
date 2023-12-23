import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionsUseCase } from './answer-questions'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionsUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionsUseCase(inMemoryAnswersRepository)
  })
  // sut =system under test
  it('should be able to create a new question', async () => {
    const result = await sut.execute({
      content: 'Nova Resposta',
      instructorId: '1',
      questionId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0].id).toEqual(
      result.value?.answer.id,
    )
  })
})
