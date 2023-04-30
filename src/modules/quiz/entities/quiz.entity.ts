import { Entity, Column } from 'typeorm';

@Entity('quiz')
export class Quiz {
  @Column()
  question_id: number;

  @Column()
  answer: string;

  @Column()
  user_id: number;

  @Column('date')
  expire_date: string;
}
