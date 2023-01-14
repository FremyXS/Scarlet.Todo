import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UpdateCollectionNotesDto } from './dto/update-collection-notes.dto';
import { CreateCollectionNotesDto } from './dto/create-collection-notes.dto';
import { CollectionNotes } from './entities/collection-notes.entity';
import { Note } from './entities/note.entity';

@Injectable()
export class TodoService {
  private readonly collections: CollectionNotes[] = [];
  private readonly notes: Note[] = [];

  createNote(createNoteDto: CreateNoteDto) {
    const ID = this.notes.length + 1;

    this.notes.push({
      ...createNoteDto,
      id: ID,
      isCompleted: false,
    });

    return ID;
  }

  createCollection(createCollectionNotesDto: CreateCollectionNotesDto) {
    const ID = this.collections.length + 1;

    this.collections.push({
      ...createCollectionNotesDto,
      id: ID,
    });

    return ID;
  }

  updateNote(id: number, updateNoteDto: UpdateNoteDto) {
    const oldNote = this.notes.find((note) => note.id === id);

    if (oldNote) {
      this.notes[this.notes.indexOf(oldNote)] = {
        ...updateNoteDto,
        id: id,
      };
    }

    return id;
  }

  completeNote(id: number) {
    const oldNote = this.notes.find((note) => note.id === id);

    if (oldNote) {
      this.notes[this.notes.indexOf(oldNote)] = {
        ...oldNote,
        isCompleted: !oldNote.isCompleted,
      };
    }

    return id;
  }

  updateCollection(
    id: number,
    updateCollectionNotesDto: UpdateCollectionNotesDto,
  ) {
    const oldNote = this.collections.find((note) => note.id === id);

    if (oldNote) {
      this.collections[this.collections.indexOf(oldNote)] = {
        ...updateCollectionNotesDto,
        id: id,
      };
    }

    return id;
  }

  removeNote(id: number) {
    return `This action removes a #${id} todo`;
  }

  removeCollection(id: number) {
    return `This action removes a #${id} todo`;
  }

  findAllNotes() {
    return this.notes;
  }

  findAllCollections() {
    return this.collections;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }
}
