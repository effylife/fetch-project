export interface DogInterface {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}
export interface LocationInterface {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}
export interface CoordinatesInterface {
    lat: number;
    lon: number;
}

export interface DropdownOptionInterface {
    value: string;
    label: string;
}

export interface FilterOptionsInterface {
    sortOrder: 'breed:asc' | 'breed:desc' | 'age:asc' | 'age:desc';
    breeds: string[] | null;
    pageNumber: number,
}