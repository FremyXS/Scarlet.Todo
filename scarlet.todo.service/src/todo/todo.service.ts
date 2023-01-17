import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UpdateCollectionNotesDto } from './dto/update-collection-notes.dto';
import { CreateCollectionNotesDto } from './dto/create-collection-notes.dto';
import { CollectionNotes } from './entities/collection-notes.entity';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteDto } from './dto/note.dto';

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

    return await this.notesRepository.save({
      description: createNoteDto.description,
      date: createNoteDto.date,
      isCompleted: false,
      collectionNotes: data!,
    });
  }

  async createCollection(createCollectionNotesDto: CreateCollectionNotesDto) {
    return await this.collectionNotesRepository.save({
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
    console.log(await this.findOneNote(id));
    await this.notesRepository.update(
      {
        id: id,
      },
      {
        isCompleted: !((await this.findOneNote(id))?.isCompleted as boolean),
      },
    );
  }

  async updateCollection(
    id: number,
    updateCollectionNotesDto: UpdateCollectionNotesDto,
  ) {
    await this.collectionNotesRepository.update(
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
    const notes: NoteDto[] = [];
    const notesData = await this.notesRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.collectionNotes', 'collection_notes')
      .getMany();
    notesData.map((el) => {
      notes.push({ ...el, collectionNotesId: el.collectionNotes.id });
    });
    return notes;
  }

  async findAllCollections() {
    return await this.collectionNotesRepository.find();
  }

  async findOneCollection(id: number) {
    return await this.collectionNotesRepository.findOneBy({ id: id });
  }

  async findOneNote(id: number) {
    const note = await this.notesRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.collectionNotes', 'collection_notes')
      .where('note.id = :id', { id: id })
      .getOne();

    const noteDto: NoteDto = {
      ...note!,
      collectionNotesId: note?.collectionNotes.id as number,
    };

    return await noteDto;
  }
}
