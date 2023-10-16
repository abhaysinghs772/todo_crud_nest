// src/todo/todo.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(+id);
  }

  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(+id, todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(+id);
  }
}
