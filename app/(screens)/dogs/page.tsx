'use client' 

import { useState, useEffect } from 'react'
import DogList from '@/components/DogList'
import DogListFilters from '@/components/DogListFilters'
import FavoritesList from '@/components/FavoritesList'
import MatchModal from '@/components/MatchModal'
import { defaultFilterOptions } from '@/helpers/defaults'
import { FilterOptionsInterface } from '@/helpers/data.types'
import fetchDogsApi from '@/data/fetchDogsApi'
import { useRouter } from 'next/navigation';


export default function Page() {

	// filter options
    const [filterOptions, setFilterOptions] = useState<FilterOptionsInterface>(defaultFilterOptions);
    // sets whether match modal is shown or not
    const [matchModalVisible, setMatchModalVisible] = useState<boolean>(false);
    // list of dogIds that are favorited by user ... these get passed to the /dogs/match endpoint
    const [favorites, setFavorites] = useState<string[]>([]);
	
    // use router for navigation with logout function
	const router = useRouter();

    // handle when user wants to logout
    // - call api to logout and then route to homepage/login
	const handleLogout = () => {
        const callApi = async () => {
            try {
                const response = await fetchDogsApi('/auth/logout', 'POST');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || response.statusText);
                }
            } catch (error) {
				console.log('There was an error logging out!');
            } finally {
                router.push(`/`);
            }
        };
        callApi();
	}

	// handle when filters change .. 
	const handleFilterChanged = (filterOptions: FilterOptionsInterface) => {
		setFilterOptions(filterOptions);
	}

    // whenever a dog's favorite button is selected, add or remove the dogId from favorites
    const handleFavorite = (id: string) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((item) => id !== item));
          } else {
            setFavorites([...favorites, id]);
          }
    };

	// handle when user decides to "find match"
    const handleFindMatch = () => {
        setMatchModalVisible(true);
    }
    // handle when the user closes out of their match
    const handleMatchModalClosed = () => {
        setMatchModalVisible(false);
    }

   // get favorites from local storage
   useEffect(() => {
		const localFavorites = localStorage.getItem('favorites');
		if (localFavorites) {
			setFavorites(JSON.parse(localFavorites))
		}
	}, []);
	// save favorites to local storage
	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);


	return (
        <div className="wrapper">
            <div className="section">
                <div className="container">
                    <div className="logout-link">
                        <button className='button -bordered' onClick={() => handleLogout()}>Logout</button>
                    </div>

					<DogListFilters filterOptions={filterOptions} handleFilterChanged={handleFilterChanged} />

					<div className="wrap-dogs sidebar-section">
                        <div className="sidebar">
                            <FavoritesList favorites={favorites} handleRemover={handleFavorite} handleFindMatch={handleFindMatch} />
                        </div>
                        <div className="main-content">
						    <DogList favorites={favorites} handleFavorite={handleFavorite} filterOptions={filterOptions} handlePagination={handleFilterChanged}/>
                        </div>
					</div>

				</div>
			</div>

			<MatchModal favorites={favorites} visibility={matchModalVisible} closerFunction={handleMatchModalClosed} modalTitle="Your Perfect Pup" />
		</div>
	)
}