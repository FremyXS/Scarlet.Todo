import React, { useEffect, useState } from "react";
import TodoCollection from "./TodoCollection/TodoCollection";
import TodoNote from "./TodoNote/TodoNote";
import { CollectionNotesType, NoteType } from "./types";

import './TodoList.css';
import ButtonAdd from "../../common/ButtonAdd/ButtonAdd";

function TodoList(){
    const [collections, setCollections] = useState<CollectionNotesType[]>([]);
    const [notes, setNotes] = useState<NoteType[]>([]);

    useEffect(() => {
        loadNotesAsync();
    }, [setCollections, setNotes])

    return(
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
                    <ButtonAdd value="Add Note"/>
                </TodoCollection>
            ))}
            <ButtonAdd value="Add Collection"/>
        </div>
    )

    async function loadNotesAsync() {

        const getCollections: CollectionNotesType[] = [{id: 1, title: 'Один'}, {id: 2, title: 'Два'}]
        const getNotes: NoteType[] = [
            {id: 1, description: 'направо', date: '11-12-2022', collectionNotesId: 1}, 
            {id: 2, description: 'вверх', date: '11-12-2022', collectionNotesId: 2},
            {id: 3, description: 'вниз', date: '11-12-2022', collectionNotesId: 2},
            {id: 4, description: 'налево', date: '11-12-2022', collectionNotesId: 1}
        ]

        setCollections(getCollections);
        setNotes(getNotes);
    }
}

export default TodoList;