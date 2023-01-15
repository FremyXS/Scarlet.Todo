import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './note.entity';

@Entity()
export class CollectionNotes {
  @ApiProperty({ description: 'Collection Id', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Collection Title', nullable: false })
  @Column()
  title: string;

  @OneToMany(() => Note, (note) => note.collectionNotes)
  notes: Note[];
}
