import React, { ReactNode } from "react";

import './TodoCollection.css'

function TodoCollection({id, title, children, onRedaction}:{id: string, title: string, children: ReactNode, onRedaction?: () => void}){
    return (
        <div id={id} className="todo-collection">
            <div className="todo-collection__title">{title}</div>            
            <button onClick={onRedaction} type="submit">Redaction</button>
            <div className="todo-collection__children">
                {children}
            </div>
        </div>
    );
}

export default TodoCollection;