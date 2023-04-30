import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Questions } from '../questions/entities/question.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('generate')
  async generateQuiz(@Query('count') count: number): Promise<Questions[]> {
    return this.quizService.generateQuiz(count);
  }
}
