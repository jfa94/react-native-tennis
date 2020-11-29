import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SUPPORTED_RANKINGS} from "../shared/constants";

async function callRankingsApi() {
    try {
        // TODO: Update to custom API
        let response = await fetch('https://run.mocky.io/v3/d39b1ff4-74d0-4c2a-b319-091ea070f448')
        let jsonResponse = await response.json()
        SUPPORTED_RANKINGS.forEach((category) => {
            jsonResponse[category] = jsonResponse[category].sort(
                (a, b) => parseFloat(a.officialRanking) - parseFloat(b.officialRanking)
            )
        })
        return jsonResponse
    } catch (error) {
        console.warn(`error while fetching rankings in 'playersApi.js': ${error}`)
    }
}

async function storeRankings(rankingsData) {
    try {
        await AsyncStorage.setItem('latestRankings', JSON.stringify(rankingsData))
    } catch (error) {
        console.warn(`error while storing rankings in 'playersApi.js': ${error}`)
    }
}

async function readRankings() {
    try {
        const jsonValue = await AsyncStorage.getItem('latestRankings')
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.warn(`error while getting rankings in 'playersApi.js': ${error}`)
    }
}

async function refreshRankings() {
    const apiResults = await callRankingsApi()

    if (apiResults) {
        await storeRankings(apiResults)
    }
}

export {readRankings, refreshRankings}