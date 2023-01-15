import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CollectionNotes } from './collection-notes.entity';

@Entity()
export class Note {
  @ApiProperty({ description: 'Note Id', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Note Description', nullable: false })
  @Column()
  description: string;

  @ApiProperty({ description: 'Note Date', nullable: false })
  @Column()
  date: string;

  @ApiProperty({ description: 'Completed Note', nullable: false })
  @Column({ default: true })
  isCompleted: boolean;

  @ApiProperty({
    description: 'Collection Id',
    nullable: false,
    type: () => CollectionNotes,
  })
  @ManyToOne(() => CollectionNotes, (collectionNotes) => collectionNotes.notes)
  collectionNotes: CollectionNotes;
}
