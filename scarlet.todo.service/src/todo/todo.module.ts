import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Note } from './entities/note.entity';
import { CollectionNotes } from './entities/collection-notes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Note, CollectionNotes])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
