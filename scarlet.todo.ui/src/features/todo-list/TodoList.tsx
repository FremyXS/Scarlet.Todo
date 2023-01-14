import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";


import api from "../../helpers/api/api";

import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import AddNoteModal from "./components/AddNoteModal/AddNoteModal";
import Input from "../../components/Input/Input";
import { CollectionNotesType, NoteType } from "../../types";

import TodoCollection from "./components/TodoCollection/TodoCollection";
import TodoNote from "./components/TodoNote/TodoNote";

import './TodoList.css';

function TodoList(){
    const [collections, setCollections] = useState<CollectionNotesType[]>([]);
    const [notes, setNotes] = useState<NoteType[]>([]);

    const [isRedactionNote, setIsRedactionNote] = useState(false);
    const [isRedactionCollection, setIsRedactionCollection] = useState(false);

    const[isUpdate, setIsUpdate] = useState(false);

    const [updateNote, setUpdateNote] = useState<NoteType>({
        id: 0,
        description: '',
        date: '',
        collectionNotesId: 0,
        isCompleted: false,
    })

    const [updateCollection, setUpdateCollection] = useState<CollectionNotesType>({
        id: 0,
        title: '',
    })

    useEffect(() => {
        loadNotesAsync();
    }, [setCollections, setNotes])

    function handleRedactionNote(){
        return(
            <AddNoteModal>
                <button onClick={() => setIsRedactionNote(false)}>X</button>
                <Input 
                    label="Description"
                    name='description'
                    value={updateNote.description} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUpdateNote({...updateNote, ['description']: e.target.value})
                    }}
                />
                <Input 
                    label="Date"
                    name='date'
                    value={updateNote.date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUpdateNote({...updateNote, ['date']: e.target.value})
                    }}
                />
                <button 
                onClick={() => {
                    if(isUpdate){
                        api.updateNote(updateNote);
                        setIsUpdate(false);
                    }else{
                        api.createNote(updateNote);
                    }
                    setIsRedactionNote(false); 
                    loadNotesAsync()
                }} 
                type="submit">Access</button>
            </AddNoteModal>
        )
    }

    function handleRedactionCollection(){
        return(
            <AddNoteModal>
                <button onClick={() => setIsRedactionCollection(false)}>X</button>
                <Input 
                    label="Title" 
                    name='title' 
                    value={updateCollection.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUpdateCollection({...updateCollection, ['title']: e.target.value})
                    }}
                />
                <button 
                onClick={() => {
                    if(isUpdate){
                        api.updateCollection(updateCollection); 
                        setIsUpdate(false);
                    }else{
                        api.createCollection(updateCollection);
                    }                    
                    setIsRedactionCollection(false); 
                    loadNotesAsync()
                }} 
                type="submit">Access</button>
            </AddNoteModal>
        )
    }

    return(
        <div className="todo">
        {isRedactionNote &&
            handleRedactionNote()
        }
        {isRedactionCollection &&
            handleRedactionCollection()
        }
            <div className="todo-list">
                {collections.map((collection) => (
                    <TodoCollection 
                        key={collection.id} 
                        id={collection.id!.toString()} 
                        title={collection.title}
                        onRedaction={()=>{
                            setUpdateCollection(collection);
                            setIsRedactionCollection(true);
                            setIsUpdate(true);
                        }}
                    >
                        {notes.map((note) => 
                            note.collectionNotesId === collection.id &&
                            <TodoNote 
                                key={note.id} 
                                value={note}
                                onUpdateComplete = {() => {
                                    api.updateCompleteNote(note.id!.toString()); 
                                    loadNotesAsync();
                                }}
                                onRedaction={()=>{
                                    setUpdateNote(note);
                                    setIsRedactionNote(true);
                                    setIsUpdate(true);
                                }}
                            />
                        )}
                        <ButtonAdd 
                            id={collection.id!.toString()} 
                            value="Add Note" 
                            onClick={(e: ChangeEvent<HTMLInputElement>) => { 
                                    setUpdateNote({...updateNote, collectionNotesId: Number(e.target.id)}); 
                                    setIsRedactionNote(true);
                                }}/>
                    </TodoCollection>
                ))}
                <ButtonAdd value="Add Collection" onClick={() => setIsRedactionCollection(true)}/>
            </div>
        </div>
    )

    async function loadNotesAsync() {
        const {data: getCollections} = await api.getCollections();
        const {data: getNotes}  = await api.getNotes();

        setCollections(getCollections);
        setNotes(getNotes);
    }
}

export default TodoList;