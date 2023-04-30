import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Questions } from '../questions/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Questions)
    private questionRepository: Repository<Questions>,
  ) {}

  // Create a quiz
  async generateQuiz(count: number): Promise<Questions[]> {
    const ids = await this.questionRepository
      .createQueryBuilder('questions')
      .select('questions.id')
      .orderBy('RANDOM()')
      .limit(count)
      .getRawMany();
    const tempIds = ids.map((id) => id.questions_id);
    console.log(tempIds);
    const questions = await this.questionRepository
      .createQueryBuilder('questions')
      .whereInIds(tempIds)
      .getMany();

    return this.quizCreator(questions);
  }

  quizCreator(questions: Questions[]) {
    const answers = { 1: 'a', 2: 'b', 3: 'c', 4: 'd' };
    const correctAnswers = [];
    for (const question of questions) {
      correctAnswers.push(question[answers[question.correct]]);
    }
    for (const question of questions) {
      // Make a copy of the options array
      const options = [question.a, question.b, question.c, question.d];

      // Shuffle the options array using Fisher-Yates shuffle algorithm
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      console.log(options);
      // Set the shuffled options array as the new options for the question
      question.a = options[0];
      question.b = options[1];
      question.c = options[2];
      question.d = options[3];
      question.correct = correctAnswers[questions.indexOf(question)];
    }
    return questions;
  }
}
