import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { TodoController } from './todo/todo.controller';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'crud_app',
      entities: [
        Todo,
        User
      ],
      synchronize: true, // false in production,
      logging: true,
    }),
    UserModule,
    TodoModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
