// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from '../todo/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
