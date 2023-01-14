import React, { ChangeEventHandler } from "react";

import './Input.css';

function Input({name, value, label, type, onChange}:
    {name?: string, value?: string, label?: string, type?: string, onChange?: any}){
    return (
        <div className="component-input">
            {label && <div className="component-input__label">{label}</div>}
            <div className="component-input__item">
                <input  type={type} name={name} value={value} onChange={onChange}/>
            </div>
        </div>
    );
}

export default Input;