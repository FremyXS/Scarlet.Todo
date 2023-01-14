import axios from "axios";
import { CollectionNotesType, NoteType } from "../../types";

class Api{
    async createNote(note: NoteType){
        axios.post('http://localhost:8000/todo/notes', note)
    }

    async createCollection(collection: CollectionNotesType){
        axios.post('http://localhost:8000/todo/collections', collection)
    }

    async getNotes(){
        return await axios.get<NoteType[]>('http://localhost:8000/todo/notes');
    }

    async getCollections(){
        return await axios.get<CollectionNotesType[]>('http://localhost:8000/todo/collections')
    }

    async updateCompleteNote(id: string){
        axios.patch('http://localhost:8000/todo/notes/complete/' + id);
    }

    async updateNote(note: NoteType){
        axios.patch('http://localhost:8000/todo/notes/' + note.id, note)
    }

    async updateCollection(collection: CollectionNotesType){
        axios.patch('http://localhost:8000/todo/collections/' + collection.id, collection)
    }
}

export default new Api();