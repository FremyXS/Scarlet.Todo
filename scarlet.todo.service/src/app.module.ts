import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Note } from './todo/entities/note.entity';
import { CollectionNotes } from './todo/entities/collection-notes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'Scarlet',
      entities: [Note, CollectionNotes],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TodoModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
