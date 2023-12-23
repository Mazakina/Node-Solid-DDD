import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.createFromText('example-slug'),
    })
    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-slug',
    })

    expect(result.value.question.title).toEqual(newQuestion.title)
    expect(inMemoryQuestionsRepository.items[0].title).toEqual(
      newQuestion.title,
    )
  })
})