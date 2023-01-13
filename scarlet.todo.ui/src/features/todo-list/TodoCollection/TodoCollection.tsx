import React, { ReactNode } from "react";

import './TodoCollection.css'

function TodoCollection({id, title, children}:{id: string, title: string, children: ReactNode}){
    return (
        <div id={id} className="todo-collection">
            <div className="todo-collection__title">{title}</div>
            <div className="todo-collection__children">
                {children}
            </div>
        </div>
    );
}

export default TodoCollection;