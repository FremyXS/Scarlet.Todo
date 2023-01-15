import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UpdateCollectionNotesDto } from './dto/update-collection-notes.dto';
import { CreateCollectionNotesDto } from './dto/create-collection-notes.dto';
import { CollectionNotes } from './entities/collection-notes.entity';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(CollectionNotes)
    private collectionNotesRepository: Repository<CollectionNotes>,
  ) {}

  async createNote(createNoteDto: CreateNoteDto) {
    const data = await this.findOneCollection(createNoteDto.collectionNotesId);

    return this.notesRepository.create({
      description: createNoteDto.description,
      date: createNoteDto.date,
      isCompleted: false,
      collectionNotes: data!,
    });
  }

  async createCollection(createCollectionNotesDto: CreateCollectionNotesDto) {
    return this.collectionNotesRepository.create({
      title: createCollectionNotesDto.title,
    });
  }

  async updateNote(id: number, updateNoteDto: UpdateNoteDto) {
    this.notesRepository.update(
      {
        id: id,
      },
      {
        date: updateNoteDto.date,
        description: updateNoteDto.description,
      },
    );
  }

  async completeNote(id: number) {
    this.notesRepository.update(
      {
        id: id,
      },
      {
        isCompleted: ((await this.findOneNote(id))?.isCompleted as boolean)
          ? false
          : true,
      },
    );
  }

  async updateCollection(
    id: number,
    updateCollectionNotesDto: UpdateCollectionNotesDto,
  ) {
    this.collectionNotesRepository.update(
      {
        id: id,
      },
      {
        title: updateCollectionNotesDto.title,
      },
    );
  }

  removeNote(id: number) {
    return `This action removes a #${id} todo`;
  }

  removeCollection(id: number) {
    return `This action removes a #${id} todo`;
  }

  async findAllNotes() {
    return this.notesRepository.find();
  }

  async findAllCollections() {
    return this.collectionNotesRepository.find();
  }

  async findOneCollection(id: number) {
    return await this.collectionNotesRepository.findOneBy({ id: id });
  }

  async findOneNote(id: number) {
    return await this.notesRepository.findOneBy({ id: id });
  }
}
