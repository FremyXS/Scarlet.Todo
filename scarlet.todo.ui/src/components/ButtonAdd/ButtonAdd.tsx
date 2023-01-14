import React, { ChangeEvent } from "react";

import './ButtonAdd.css';

function ButtonAdd({id, value, onClick}:{id?: string, value: string, onClick?: any}){
    return(
        <div className="button-add">
            <button id={id} className="button-add__item" type="submit" onClick={onClick}>
                <span className="button-add__plus">+</span>
                {value}
            </button>
        </div>
    )
}

export default ButtonAdd;