import { ApiProperty } from '@nestjs/swagger';

export class CollectionNotes {
  @ApiProperty({ description: 'Collection Id', nullable: false })
  id: number;

  @ApiProperty({ description: 'Collection Title', nullable: false })
  title: string;
}
