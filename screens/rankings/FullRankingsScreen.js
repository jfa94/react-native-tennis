import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Dimensions} from 'react-native';

import ScreenLoadingIndicator from "../../shared/components/ScreenLoadingIndicator";

import {readRankings} from "../../api/playersApi";
import {getHoursDiff} from "../../shared/functions";
import {TEXT_FONT_SIZE} from "../../shared/constants";

const {width} = Dimensions.get('window')

function FullRankingsScreen({route}) {
    let [latestRankings, setLatestRankings] = useState(null)
    let [refreshing, setRefreshing] = useState(true)

    const PlayerRow = (props) => {
        const {index, playerName, rankingPoints, nationality, officialRanking, dateOfBirth} = props
        const displayRank = officialRanking > 999 ? '999+' : officialRanking
        const colours = ['#f5f5f5', 'white']

        const ageHours = getHoursDiff(dateOfBirth)
        const ageYears = Math.floor(ageHours/8760)

        return (
            <View style={{backgroundColor: colours[index % 2], ...styles.playerRow}}>
                <View style={styles.playerRowLeft}>
                    <Text style={{...styles.displayRank, ...styles.text}}>{`${displayRank}`}</Text>
                    <View style={styles.flagContainer}>
                        <Image
                            style={nationality === 'CH' ? {...styles.flag, backgroundColor: '#FF0000'} : styles.flag}
                            source={{uri: `https://www.countryflags.io/${nationality}/flat/64.png`}}
                        />
                    </View>
                    <Text style={{flex: 1, ...styles.text}} numberOfLines={2} ellipsizeMode='tail'>{playerName}</Text>
                </View>
                <View style={styles.playerRowRight}>
                    <Text style={{width: (width * .08), textAlign: 'right', ...styles.text}}>{ageYears}</Text>
                    <Text style={{width: (width * .16), textAlign: 'right', ...styles.text}}>{rankingPoints}</Text>
                </View>
            </View>)
    }

    useEffect(() => {
        (async () => {
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
                    data={latestRankings[route.params.category]}
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
    },
    playerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: TEXT_FONT_SIZE * 2.8
    },
    playerRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 7
    },
    playerRowRight: {
        flexDirection: 'row',
        marginRight: 7
    },
    text: {
        fontSize: TEXT_FONT_SIZE,
        lineHeight: TEXT_FONT_SIZE * 1.3
    },
    displayRank: {
        width: (width * .11),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flag: {
        height: TEXT_FONT_SIZE,
        width: TEXT_FONT_SIZE * 1.5,
        resizeMode: 'cover',
        borderColor: '#e0e0e0',
        borderWidth: .75,
        borderRadius: 3
    },
    flagContainer: {
        width: (width * .12),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FullRankingsScreen;