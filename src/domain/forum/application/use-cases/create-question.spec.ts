import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  // sut =system under test
  it('should be able to create a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'alguma pergunta',
      content: 'conteúdo da pergunta',
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(
      result.value?.question.id,
    )
  })
})
