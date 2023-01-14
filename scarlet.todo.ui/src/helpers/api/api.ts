import axios from "axios";
import { CollectionNotesType, CreateCollectionNotes, CreateNote, NoteType } from "../../types";

class Api{
    async createNote(note: CreateNote){
        axios.post('http://localhost:8000/todo/notes', note)
    }

    async createCollection(collection: CreateCollectionNotes){
        axios.post('http://localhost:8000/todo/collections', collection)
    }

    async getNotes(){
        return await axios.get<NoteType[]>('http://localhost:8000/todo/notes');
    }

    async getCollections(){
        return await axios.get<CollectionNotesType[]>('http://localhost:8000/todo/collections')
    }
}

export default new Api();