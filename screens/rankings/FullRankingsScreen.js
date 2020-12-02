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
    const orderKey = `${orderBy.toLowerCase()}Ranking`

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

    const handleOrderBy = () => {
        setOrderBy(prevState => prevState === 'OFFICIAL' ? 'RACE' : 'OFFICIAL')
    }

    const headerRightButton = () => {
        return (
            <View style={styles.headerRightButtonContainer}>
                <TouchableOpacity style={styles.orderByHeader} onPress={handleOrderBy}>
                    <Text style={styles.orderByHeaderText}>{orderBy}</Text><Ionicons name={'md-arrow-dropdown'}/>
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        (async () => {
            let localRankings = await readRankings()
            setLatestRankings(localRankings[category])
            setRefreshing(false)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await navigation.setOptions({
                title: pageTitle,
                headerRight: headerRightButton,
                headerRightContainerStyle: {paddingHorizontal: 10}
            })
        })()
    }, [headerRightButton])

    return (
        refreshing ?
            <ScreenLoadingIndicator/> :
            <View style={styles.rankingsContainer}>
                <FlatList
                    data={latestRankings.sort((a, b) => parseFloat(a[orderKey]) - parseFloat(b[orderKey]))}
                    keyExtractor={(player) => player.playerId}
                    renderItem={({index, item}) => {
                        return <PlayerRow index={index} {...item} orderKey={orderKey} navigation={navigation}/>
                    }}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    rankingsContainer: {
        flex: 1
    },
    headerRightButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    orderByHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 5,
        padding: 3
    },
    orderByHeaderText: {
        fontSize: 11,
        lineHeight: 15,
        fontWeight: 'bold'
    }
});

export default FullRankingsScreen;