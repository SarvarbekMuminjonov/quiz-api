import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  a: string;

  @Column()
  b: string;

  @Column()
  c: string;

  @Column()
  d: string;

  @Column()
  correct: string;
}
