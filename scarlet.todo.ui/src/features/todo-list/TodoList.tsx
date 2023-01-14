import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";


import api from "../../helpers/api/api";

import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import AddNoteModal from "./components/AddNoteModal/AddNoteModal";
import Input from "../../components/Input/Input";

import { CollectionNotesType, NoteType } from "./types";
import TodoCollection from "./components/TodoCollection/TodoCollection";
import TodoNote from "./components/TodoNote/TodoNote";

import './TodoList.css';
import { CreateCollectionNotes, CreateNote } from "../../types";

function TodoList(){
    const [collections, setCollections] = useState<CollectionNotesType[]>([]);
    const [notes, setNotes] = useState<NoteType[]>([]);

    const [showModalNote, setShowModalNote] = useState(false);
    const [showModalCollection, setShowModalCollection] = useState(false);

    const [createNote, setCreateNote] = useState<CreateNote>({
        description: '',
        date: '',
        collectionNotesId: 0,
    })

    const [createCollection, setCreateCollection] = useState<CreateCollectionNotes>({
        title: '',
    })


    useEffect(() => {
        loadNotesAsync();
    }, [setCollections, setNotes])

    return(
        <div className="todo">
        {showModalNote && 
            <AddNoteModal>
                <button onClick={() => setShowModalNote(false)}>X</button>
                <Input 
                    label="Description"
                    name='description'
                    value={createNote.description} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setCreateNote({...createNote, ['description']: e.target.value})}}
                />
                <Input 
                    label="Date"
                    name='date'
                    value={createNote.date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setCreateNote({...createNote, ['date']: e.target.value})}}
                />
                <button onClick={() => {api.createNote(createNote); setShowModalNote(false); loadNotesAsync()}} type="submit">Access</button>
            </AddNoteModal>
        }
        {showModalCollection && 
            <AddNoteModal>
                <button onClick={() => setShowModalCollection(false)}>X</button>
                <Input 
                    label="Title" 
                    name='title' 
                    value={createCollection.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setCreateCollection({...createCollection, ['title']: e.target.value})}}
                />
                <button onClick={() => {api.createCollection(createCollection); setShowModalCollection(false); loadNotesAsync()}} type="submit">Access</button>
            </AddNoteModal>
        }
            <div className="todo-list">
                {collections.map((collection) => (
                    <TodoCollection 
                        key={collection.id} 
                        id={collection.id.toString()} 
                        title={collection.title}
                    >
                        {notes.map((note) => 
                            note.collectionNotesId === collection.id &&
                            <TodoNote 
                                key={note.id} 
                                value={note} 
                            />
                        )}
                        <ButtonAdd id={collection.id.toString()} value="Add Note" onClick={(e: ChangeEvent<HTMLInputElement>) => { setCreateNote({...createNote, collectionNotesId: Number(e.target.id)}); setShowModalNote(true);}}/>
                    </TodoCollection>
                ))}
                <ButtonAdd value="Add Collection" onClick={() => setShowModalCollection(true)}/>
            </div>
        </div>
    )

    async function loadNotesAsync() {

        // const getCollections: CollectionNotesType[] = [{id: 1, title: 'Один'}, {id: 2, title: 'Два'}]
        // const getNotes: NoteType[] = [
        //     {id: 1, description: 'направо', date: '11-12-2022', collectionNotesId: 1}, 
        //     {id: 2, description: 'вверх', date: '11-12-2022', collectionNotesId: 2},
        //     {id: 3, description: 'вниз', date: '11-12-2022', collectionNotesId: 2},
        //     {id: 4, description: 'налево', date: '11-12-2022', collectionNotesId: 1}
        // ]

        const {data: getCollections} = await api.getCollections();
        const {data: getNotes}  = await api.getNotes();

        setCollections(getCollections);
        setNotes(getNotes);
    }
}

export default TodoList;