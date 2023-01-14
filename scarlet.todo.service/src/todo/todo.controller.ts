import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UpdateCollectionNotesDto } from './dto/update-collection-notes.dto';
import { CreateCollectionNotesDto } from './dto/create-collection-notes.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Note } from './entities/note.entity';

@ApiTags('ToDo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('notes')
  findAllNotes() {
    return this.todoService.findAllNotes();
  }

  @Post('notes')
  createNote(@Body() createTodoDto: CreateNoteDto) {
    return this.todoService.createNote(createTodoDto);
  }

  @Patch('notes/:id')
  @ApiOperation({ summary: 'Updates a note with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateNote(@Param('id') id: string, @Body() updateTodoDto: UpdateNoteDto) {
    return this.todoService.updateNote(+id, updateTodoDto);
  }

  @Patch('notes/complete/:id')
  completeNote(@Param('id') id: string) {
    return this.todoService.completeNote(+id);
  }

  @Delete('notes/:id')
  removeNote(@Param('id') id: string) {
    return this.todoService.removeNote(+id);
  }

  @Get('collections')
  findAllCollections() {
    return this.todoService.findAllCollections();
  }

  @Post('collections')
  createCollections(@Body() createTodoDto: CreateCollectionNotesDto) {
    return this.todoService.createCollection(createTodoDto);
  }

  @Patch('collections/:id')
  updateCollections(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateCollectionNotesDto,
  ) {
    return this.todoService.updateCollection(+id, updateTodoDto);
  }

  @Delete('collections/:id')
  removeCollections(@Param('id') id: string) {
    return this.todoService.removeCollection(+id);
  }
}
