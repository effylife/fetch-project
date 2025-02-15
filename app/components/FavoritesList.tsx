'use client'

import { useState, useEffect } from "react"
import DogsSample from "@/data/dogs"
import { MdFavorite } from "react-icons/md"
import fetchDogsApi from "@/data/fetchDogsApi"
import { DogInterface } from "@/helpers/data.types"

type ParentProps = {
    favorites: string[];
    handleRemover: (id:string) => void;
    handleFindMatch: () => void;
}

export default function FavoritesList({favorites, handleRemover, handleFindMatch}: ParentProps) {


    // list of favorites fetched from api
    const [favoriteDogs, setFavoriteDogs] = useState<DogInterface[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // * Fetch dogIds then fetch dogs from api on load, or whenever filters/sorting are changed
    useEffect(() => {
        if (!favorites.length) {
            setFavoriteDogs(null);
            return;
        };
        const fetchData = async () => {
            try {
                const response_dogs = await fetchDogsApi('/dogs', 'POST', favorites);
                setFavoriteDogs(response_dogs);
            } catch (error) {
                setError('There was an error fetching dogs!');
            }
        };
        fetchData();
    }, [favorites]);

    const handleShowFavorites = () => {
        const wrapper = document.querySelector('.list-favorites');
        wrapper?.classList.toggle('-show-favorites');
    }

    return (
        <div className="list-favorites">
            <h3>Favorite Pups</h3>
            <p className="instruction-text">Your liked dogs are listed below. When you're ready, get matched with the dog that is best for you.</p>
            { !favorites.length || !favoriteDogs
            ?
                <p className="instruction-alert">No dogs favorited yet!<br/>Add dogs to your favorites list by selecting the <MdFavorite className="inline-favorite-icon" /> on a dog's photo.</p>
            :
                <div>
                    <div className="wrap-buttons">
                        <button className="button -soft show-more-link" onClick={() => handleShowFavorites()}>Show My Favorites ({favorites.length})</button>
                        <button className="button" onClick={() => handleFindMatch()}>Find My Match!</button>
                    </div>
                    <div className="wrap-favorites">
                        {favoriteDogs.map((dog) => 
                            <div className="favorite-dog" key={dog.id}>
                                <div className="image" style={{backgroundImage:'url('+dog.img+')'}}></div>
                                <div className="text">
                                    <h3>{dog.name}</h3>
                                    <p>{dog.breed}</p>
                                </div>
                                <div className="wrap-remover">
                                    <span className="remover" onClick={() => handleRemover(dog.id)}>&times;</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}