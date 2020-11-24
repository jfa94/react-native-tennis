import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace with API call
import {RANKINGS} from '../shared/dummyData/PLAYERS'
import {SUPPORTED_RANKINGS} from "../shared/constants";

async function callRankingsApi() {
    try {
        let response = await fetch('https://run.mocky.io/v3/b8d190a4-ea99-4ba7-a77d-08ca702f7324')
        return await response.json();
    } catch (error) {
        console.log(`error while fetching rankings in 'playersApi.js': ${error}`)
    }
}

async function storeRankings() {
    // TODO: Finish storing and reading from storage
    try {
        await AsyncStorage.setItem()
    } catch (error) {
        console.log(`error while storing rankings in 'playersApi.js': ${error}`)
    }
}


const PlayersApi = createContext(null)

function PlayersProvider(props) {
    const [playerCategories, setPlayerCategories] = useState(RANKINGS)

    return (
        <PlayersApi.Provider value={{playerCategories}}>
            {props.children}
        </PlayersApi.Provider>
    );
}

export {PlayersProvider, PlayersApi};