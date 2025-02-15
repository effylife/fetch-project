'use client'

import { useState, useEffect } from "react";
import DogItem from "./DogItem";
import { DogInterface, FilterOptionsInterface } from "@/helpers/data.types";
import Loading from "./Loading";
// SAMPLE DATA
import fetchDogsApi from "@/data/fetchDogsApi";
import Link from "next/link";
import Pagination from "./Pagination";
import { RESULTS_SIZE, MAX_PAGES_SHOWN } from "@/helpers/defaults";

type ParentProps = {
    favorites: string[];
    handleFavorite: (id: string) => void;
    filterOptions: FilterOptionsInterface;
    handlePagination: (filterOptions: FilterOptionsInterface) => void;
}

// TODO: put this setting somewh

const DogList = ({ favorites, handleFavorite, filterOptions, handlePagination}: ParentProps) => {


    // list of dogs fetched from api
    const [dogs, setDogs] = useState<DogInterface[] | null>(null);
    // page loading while data is fetched from api
    const [loading, setLoading] = useState(true);
    // show error message if api connection doesn't work
    const [error, setError] = useState<string | null>(null);
    // total number of results based on current filterOptions
    const [totalResults, setTotalResults] = useState<number>(0);

    // * Fetch dogIds then fetch dogs from api on load, or whenever filters/sorting are changed
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const from = filterOptions.pageNumber * RESULTS_SIZE - RESULTS_SIZE - 1;
                let queryParams = '?size=' + RESULTS_SIZE + '&from=' + from + '&sort=' + filterOptions.sortOrder;
                if (filterOptions.breeds) {
                    filterOptions.breeds.forEach(
                        item => {
                            queryParams = queryParams + '&breeds=' + item;
                        }
                    )
                    // queryParams = queryParams + '&breeds=' + filterOptions.breeds;
                }
                const response_dogIds = await fetchDogsApi('/dogs/search' + queryParams);
                setTotalResults(response_dogIds.total);
                const response_dogs = await fetchDogsApi('/dogs', 'POST', response_dogIds.resultIds);
                setDogs(response_dogs);
            } catch (error) {
                setError('There was an error fetching dogs!');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [filterOptions]);

    // function to check if a dog is favorited
    const isFavorite = (id: string) => {
        return favorites.some(item => item === id);
    }

    const handlePageSelected = (page: number) => {
        handlePagination({ ...filterOptions, pageNumber: page });
    }

    // static values for pagination
    let resultsEnd = RESULTS_SIZE * filterOptions.pageNumber;
    const resultsStart = resultsEnd - RESULTS_SIZE + 1;
    const totalPages = Math.ceil(totalResults / RESULTS_SIZE);
    if (resultsEnd > totalResults) resultsEnd = totalResults;


    


    if (loading) {
        return (
            <Loading text="Throwing a stick to see who comes..." />
        )
    }

    if (!dogs) {
        return (
            <div>
                <p>{error} You need to login to be here!</p>
                <Link href="/" className="button">Go to Login</Link>
            </div>

        )
    }

    return (
        <div className="list">
            <section className="list-dogs">
                {dogs.map((dog) =>
                    <DogItem
                        key={dog.id}
                        dog={dog}
                        favorite={isFavorite(dog.id)}
                        handleFavorite={handleFavorite}
                    />
                )}
            </section>
            <div className="pagination">
                <div className="vertical-space -large"></div>
                <p>Viewing Results <span>{resultsStart}</span>-<span>{resultsEnd}</span> of <span>{totalResults}</span></p>
                <Pagination handlePageSelected={handlePageSelected} totalPages={totalPages} currentPage={filterOptions.pageNumber} />
            </div>
        </div>

    )
}

export default DogList;