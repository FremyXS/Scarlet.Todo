import React from "react";

import './ButtonAdd.css';

function ButtonAdd({value}:{value: string}){
    return(
        <div className="button-add">
            <button className="button-add__item" type="submit">
                <span className="button-add__plus">+</span>
                {value}
            </button>
        </div>
    )
}

export default ButtonAdd;