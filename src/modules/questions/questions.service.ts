import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from '../quiz/dto/create-quiz.dto';
import { Questions } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questionRepository: Repository<Questions>,
  ) {}
  async create(createQuizDto: CreateQuizDto[]): Promise<Questions[]> {
    return this.questionRepository.save(createQuizDto);
  }
}
