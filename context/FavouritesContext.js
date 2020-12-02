import React, {useState, createContext, useEffect} from 'react';
import {storeFavourites, readFavourites} from "../api/favouritesApi";

const FavouritesContext = createContext(null)

function FavouritesProvider(props) {
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        (async () => {
            const localFavourites = await readFavourites()
            setFavourites(localFavourites)
        })()
    }, [])

    useEffect(() => {
        if (favourites.length > 0) {
            storeFavourites(favourites)
        }
    }, [favourites])

    const favouritesReducer = (action, data) => {
        if (typeof data === 'string' || data instanceof String) {
            switch (action) {
                case 'ADD':
                    setFavourites(prevState => [...prevState, data]);
                    break;
                case 'REMOVE':
                    setFavourites(prevState => prevState.filter(item => item !== data));
                    break;
                default:
                    console.warn(`Action '${action}' not supported by favouritesReducer`)
            }
        } else {
            console.warn(`Data passed to favouritesReducer is not a string`)
        }
    }

    return (
        <FavouritesContext.Provider value={{favourites, favouritesReducer}}>
            {props.children}
        </FavouritesContext.Provider>
    );
}

export {FavouritesProvider, FavouritesContext};