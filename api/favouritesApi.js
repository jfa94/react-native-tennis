import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function storeFavourites(playerIds) {
    try {
        AsyncStorage.setItem('favouritePlayers', JSON.stringify(playerIds))
    } catch (error) {
        console.warn(`error while storing favourite players in 'favouritesApi.js': ${error}`)
    }
}

async function readFavourites() {
    try {
        const jsonValue = await AsyncStorage.getItem('favouritePlayers')
        return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.warn(`error while getting favourite players in 'favouritesApi.js': ${error}`)
    }
}

export {storeFavourites, readFavourites}