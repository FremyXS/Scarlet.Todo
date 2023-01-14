import React, { ReactNode } from "react";

import './AddNoteModal.css';

function AddNoteModal({children}:{children: ReactNode}){
    return (
        <div className="modal">
            <div className="modal-window">
                {children}
            </div>
        </div>
    );
}

export default AddNoteModal;