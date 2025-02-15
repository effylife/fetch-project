export const defaultFilterOptions = {
    sortOrder: "breed:asc" as const,
    breeds:null,
    pageNumber:1,
}

// sort options available
export const sortOptions = [
    {
        value: 'breed:asc',
        label: 'Breed (A-Z)'
    },
    {
        value: 'breed:desc',
        label: 'Breed (Z-A)'
    },
    {
        value: 'age:asc',
        label: 'Age (youngest first)'
    },
    {
        value: 'age:desc',
        label: 'Age (oldest first)'
    },
]

// default number of results to return
export const RESULTS_SIZE: number = 30;
// max number of pages to show in pagination
export const MAX_PAGES_SHOWN: number = 3;
