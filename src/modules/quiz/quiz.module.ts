import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
