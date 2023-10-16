// src/todo/todo.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return this.todoRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
