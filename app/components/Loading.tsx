type ParentProps = {
    text: string;
}

export default function Loading({text}: ParentProps) {

    return (
        <div className="loading">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            <p>{text}</p>
        </div>
    )
}