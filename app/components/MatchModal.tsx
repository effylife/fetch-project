'use client'

import { useState, useEffect } from "react";
import ModalContainer from "@/components/ModalContainer";
import Loading from "@/components/Loading";
import { DogInterface } from "@/helpers/data.types";
import fetchDogsApi from "@/data/fetchDogsApi";
import Image from "next/image";


type ParentProps = {
    visibility: boolean;
    closerFunction: (visibility: boolean) => void;
    modalTitle: string;
    favorites: string[];
}

export default function MatchModal({visibility, closerFunction, modalTitle, favorites}: ParentProps) {

    // used to simulate fetching match from api
    const [loading, setLoading] = useState<boolean>(true);
    const [match, setMatch] = useState<DogInterface | null>(null);
    const [error, setError] = useState<string | null>(null);

    // * Fetch dogs from api on load or whenever filters are changed
    useEffect(() => {
        if (!visibility) return;
        setLoading(true);
        const fetchData = async () => {
            try {
                const response_matchId = await fetchDogsApi('/dogs/match', 'POST', favorites);
                const response_match = await fetchDogsApi('/dogs', 'POST', Array(response_matchId.match));
                setMatch(response_match[0]);
            } catch (error) {
                setError('There was an error fetching dogs!');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [visibility])

    return (
		<ModalContainer visibility={visibility} closerFunction={closerFunction} modalTitle={modalTitle}>
            {loading || !visibility
            ?
                <Loading text="Finding your match..." />
            :
                <div>
                    {match
                    ?
                        <div className="wrap-match">
                            <div className="matched-dog">
                                <div className="image">
                                    <img src={match.img} alt="" />
                                </div>
                                <div className="body">
                                    <h2>{match.name}</h2>
                                    <p>{match.breed}</p>
                                    {match.age
                                    ?
                                        <p>{match.age} year{match.age > 1 ? ('s') : null} old</p>
                                    :
                                        <p>Still a puppy!</p>
                                    }
                                    <p className="location">Located in City, ST {match.zip_code}</p>
                                </div>
                            </div>
                            <div className="next-steps">
                                <h3>What happens now?</h3>
                                <p>{match.name} is ready to meet you! If you are too, get started by setting up a meet-and-greet. You can visit {match.name} where they reside now or you can schedule an in-home visit if you are local to City, ST {match.zip_code}. Woof woof!</p>
                                <button className="button -cta" onClick={() => alert("Unfortunately this is just a test site... If you really want to adopt, search for shelters and rescues in your area!")}>Setup Next Steps</button>
                            </div>
                        </div>
                    :
                        <p className="error-message">{error}</p>
                    }
                </div>
            }
        </ModalContainer>
    )
}