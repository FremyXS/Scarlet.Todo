import { ApiProperty } from '@nestjs/swagger';

export class Note {
  @ApiProperty({ description: 'Note Id', nullable: false })
  id: number;

  @ApiProperty({ description: 'Note Description', nullable: false })
  description: string;

  @ApiProperty({ description: 'Note Date', nullable: false })
  date: string;

  @ApiProperty({ description: 'Completed Note', nullable: false })
  isCompleted: boolean;

  @ApiProperty({ description: 'Collection Id', nullable: false })
  collectionNotesId: number;
}
