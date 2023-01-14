import React, { useState } from "react";
import Input from "../../../../components/Input/Input";
import { NoteType } from "../../../../types";
import AddNoteModal from "../AddNoteModal/AddNoteModal";

import './TodoNote.css';

function TodoNote({value, onUpdateComplete, onRedaction}:{value: NoteType, onUpdateComplete?: ()=> void, onRedaction?: () => void}){

    return (
        <div className="todo-note">            
            <div className="todo-note__date">{value.date}</div>
            <div className="todo-note__description">{value.description}</div>
            <button onClick={onRedaction} type="submit">Redaction</button>
            <button onClick={onUpdateComplete} type="submit">{value.isCompleted? "Set Not Complete" : "Set Complete"}</button>
            <button type="submit">Delete</button>
        </div>
    ); 
}

export default TodoNote;