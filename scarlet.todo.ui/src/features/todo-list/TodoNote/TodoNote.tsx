import React from "react";
import { NoteType } from "../types";

import './TodoNote.css';

function TodoNote({value}:{value: NoteType}){
    return (
        <div className="todo-note">
            <div className="todo-note__date">{value.date}</div>
            <div className="todo-note__description">{value.description}</div>
        </div>
    ); 
}

export default TodoNote;