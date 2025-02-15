import { DogInterface } from "@/helpers/data.types";
import { MdFavorite } from "react-icons/md";

type ParentProps = {
    dog: DogInterface,
    favorite: boolean,
    handleFavorite: (id: string) => void,
}

const DogItem = ({dog, favorite, handleFavorite}: ParentProps) => {



    return (
        <article className="card dog-card">
            <div className="image" style={{backgroundImage:'url('+dog.img+')'}}>
                <button className={"favorite-button" + (favorite ? " -selected" : '')} onClick={() => handleFavorite(dog.id)}>
                    <MdFavorite className="favorite-icon" size={100} />
                </button>
            </div>
            <div className="body">
                <h2>{dog.name}</h2>
                <p>{dog.breed}</p>
                {dog.age
                ?
                    <p>{dog.age} year{dog.age > 1 ? ('s') : null} old</p>
                :
                    <p>Still a puppy!</p>
                }
                <p className="location">Located in City, ST {dog.zip_code}</p>
            </div>
        </article>
    )
}

export default DogItem;