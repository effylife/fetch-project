'use client'

import { useEffect } from "react"

type ParentProps = {
    visibility: boolean;
    closerFunction: (visibility: boolean) => void;
    children: React.ReactNode;
    modalTitle: string;
}

export default function ModalContainer({visibility, closerFunction, modalTitle, children}: ParentProps) {

    // add class to <body> element so we know a modal is open and prevent scrolling/scrollbar issues
    useEffect(() => {
        if (visibility) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [visibility]);

    return (
        <div className={"modal" + (visibility ? " _active" : "")}>
            <div className="modal-container">
                <div className="modal-header">
                    <div className="container">
                        <div className="title">
                            <h2>{modalTitle}</h2>
                        </div>
                        <button className="modal-closer" onClick={() => closerFunction(false)}>X</button>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}