import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ScreenLoadingIndicator from "../../shared/components/ScreenLoadingIndicator";
import PlayerRow from "../../components/RankingsScreen/FullRankingsScreen/PlayerRow";

import {readRankings} from "../../api/playersApi";

function FullRankingsScreen({navigation, route}) {
    let [latestRankings, setLatestRankings] = useState(null)
    let [refreshing, setRefreshing] = useState(true)
    let [orderBy, setOrderBy] = useState('OFFICIAL')

    const category = route.params.category

    let pageTitle
    switch (category) {
        case 'ATP_SINGLES':
            pageTitle = 'ATP Singles';
            break;
        case 'WTA_SINGLES':
            pageTitle = 'WTA Singles';
            break;
        case 'ATP_DOUBLES':
            pageTitle = 'ATP Doubles';
            break;
        case 'WTA_DOUBLES':
            pageTitle = 'WTA Doubles';
            break;
    }

    const headerRightButton = () => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 2, borderRadius: 5, padding: 3}}>
                    <Text style={{fontSize: 11, lineHeight: 15, fontWeight: 'bold'}}>{orderBy}</Text><Ionicons name={'md-arrow-dropdown'} />
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 38}}>
                    <Ionicons name={'md-search'} size={28}/>
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        (async () => {
            await navigation.setOptions({
                title: pageTitle,
                headerRight: headerRightButton
            })
            let localRankings = await readRankings()
            setLatestRankings(localRankings)
            setRefreshing(false)
        })()
    }, [])

    return (
        refreshing ?
            <ScreenLoadingIndicator /> :
            <View style={styles.rankingsContainer}>
                <FlatList
                    data={latestRankings[category]}
                    keyExtractor={(player) => player.playerId}
                    renderItem={({index, item}) => {
                        return <PlayerRow index={index} {...item} />
                    }}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    rankingsContainer: {
        flex: 1
    }
});

export default FullRankingsScreen;