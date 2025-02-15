'use client'

import { useState, useEffect } from "react"
import { FilterOptionsInterface, DropdownOptionInterface } from "@/helpers/data.types"
import Breeds from "@/data/breeds"
import Select from "react-dropdown-select"
import { sortOptions } from "@/helpers/defaults"

type ParentProps = {
    filterOptions: FilterOptionsInterface;
    handleFilterChanged: (filterOptions: FilterOptionsInterface) => void;
}


export default function DogListFilters({filterOptions, handleFilterChanged}: ParentProps) {

    // for use with the filter dropdown, the Breeds array needs to be converted from strings to objects with a value+label
    // TODO: Breeds would be coming from api so this needs to wait for breeds to be fetched
    const breedOptions = Breeds.map(breed => ({
        value: breed,
        label: breed,
    }));

    const [currentFilterOptions, setCurrentFilterOptions] = useState<FilterOptionsInterface>(filterOptions)

    useEffect(() => {
        handleFilterChanged(currentFilterOptions);
    }, [currentFilterOptions]);


    // handle when user changes sort order
    const handleSortOrderChanged = (values: DropdownOptionInterface[]) => {
        const value = values[0].value;
        // TODO: it seems crazy to manage these strings in this file .. need to put them elsewhere
        if (value === "breed:asc" || value === "breed:desc" || value === "age:asc" || value === "age:desc") {
            // update sort order and reset to page 1
            setCurrentFilterOptions(prevFilterOptions => ({ ...prevFilterOptions, sortOrder: value, page: 1 }));
        }
    }
    
    // handle when the user selects elements from the breeds filter
    const handleBreedsChanged = (values: DropdownOptionInterface[]) => {
        const selectedBreedStrings: string[] = [];
        values.forEach(breed => {
            selectedBreedStrings.push(breed.value);
        });
        // update breeds filter with new data and reset to page 1
        setCurrentFilterOptions(prevFilterOptions => ({ ...prevFilterOptions, breeds: selectedBreedStrings, page: 1 }));
    }

    return (
        <div className="filters">
            {!Breeds ? null :
                <div className="filter">
                    <label>View Specific Breeds</label>
                    <Select
                        className="dropdown"
                        values={[]}
                        options={breedOptions}
                        onChange={(values) => handleBreedsChanged(values)}
                        multi={true}
                        clearable={true}
                        closeOnSelect={true}
                        closeOnScroll={true}
                        color="#def0ec" // TODO: this color should be managed elsewhere
                        placeholder="All Breeds"
                    />
                </div>
            }
            <div className="filter">
                <label>Sort Results</label>
                <Select
                    className="dropdown"
                    values={[sortOptions[0]]}
                    options={sortOptions}
                    onChange={(values) => handleSortOrderChanged(values)}
                    color="#def0ec" // TODO: this color should be managed elsewhere
                    placeholder="Sort List of Dogs"
                />
            </div>
        </div>
    )
}