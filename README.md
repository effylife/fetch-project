## Fetch Frontend Take-Home Exercise

View Live at []()

## Running Locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view.


## Some Notes

// OPTIMIZATIONS
    / Remove unnecessary re-renders and calls to api
    / Currently whenever a favorite is added/removed, we are re-fetching the whole list of favorites. We should not be making any api call if a favorite is removed, and we should only make a call for the new dog when a favorite is added and push the new dog to local array
    / Sometimes when on the last page of results, more than the expected amount of results are returned (might only be for unfiltered results)
        *** encountering new error where last page of unfiltered results is returning nothing

// TOP PRIORITIES
    / Catch errors like email not being an actual email before sending to server
    / As you scroll down and add favorites, the "find match" and list of favorites gets farther and farther away (make sticky)
    / Convert zip codes into city/state
    / There are currently no limitations on the favorites list. Should add boundaries for maxNumberAllowed or maxNumberShown+showFullList
    / Images are not consistent sizes so sometimes images are too small for space provided (matched-dog modal)
    / Improve UI/UX


// NOT REQUIRED BUT WOULD BE NICE TO HAVE
    / Add transitions and animations
    / Would be nice if we could filter by size/coat/activity-level and other key dog characterists. This would require db and api update... maybe breeds could be an object that contains these types of characteristics.