import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { Questions } from '../questions/entities/question.entity';
import { QuizService } from '../quiz/quiz.service';
import { CreateQuizDto } from '../quiz/dto/create-quiz.dto';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly questionService: QuestionsService) {}

  async uploadFile(/*file: Express.Multer.File*/): Promise<void> {
    let quizs: CreateQuizDto[] = [];
    const filePath = path.join(process.cwd(), 'uploads', 'jt4-kurs.xlsx');
    // fs.writeFileSync(filePath, file.buffer);

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (Array.isArray(row) && row.length === 0) continue;
      quizs.push({
        question: row[1],
        a: row[2],
        b: row[3],
        c: row[4],
        d: row[5],
        correct: row[6],
      });
    }
    await this.questionService.create(quizs);
    // fs.unlinkSync(filePath);
  }
}
