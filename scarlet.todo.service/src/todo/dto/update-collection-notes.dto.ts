import { PartialType } from '@nestjs/swagger';
import { CreateCollectionNotesDto } from './create-collection-notes.dto';

export class UpdateCollectionNotesDto extends PartialType(
  CreateCollectionNotesDto,
) {
  title: string;
}
