import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { QuizService } from '../quiz/quiz.service';
import { QuizModule } from '../quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../questions/entities/question.entity';
import { QuestionsService } from '../questions/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
  controllers: [FileUploadController],
  providers: [FileUploadService, QuestionsService],
})
export class FileUploadModule {}
