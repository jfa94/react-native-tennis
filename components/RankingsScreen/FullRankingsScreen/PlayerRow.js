import React, {useState, useContext, useEffect} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import {FavouritesContext} from "../../../context/FavouritesContext";

import {getHoursDiff} from "../../../shared/functions";
import {TEXT_FONT_SIZE} from "../../../shared/constants";

const {width} = Dimensions.get('window')

export default function PlayerRow (props) {
    const {favourites, favouritesReducer} = useContext(FavouritesContext)
    const [favourite, setFavourite] = useState(false)

    const {
        index,
        playerId,
        playerName,
        dateOfBirth,
        rankingPoints,
        ytdRankingPoints,
        nationality,
        officialRanking,
        raceRanking,
        orderKey,
        navigation
    } = props

    const usedRanking = orderKey === 'raceRanking' ? raceRanking : officialRanking
    const displayRank = usedRanking > 999 ? '999+' : usedRanking
    const displayedPoints = orderKey === 'raceRanking' ? ytdRankingPoints : rankingPoints

    const ageYears = Math.floor(getHoursDiff(dateOfBirth)/8760)

    const colours = ['#f5f5f5', 'white']

    useEffect(() => {
        favourites.includes(playerId) ? setFavourite(true) : setFavourite(false)
    }, [])

    const handlePlayerRowPress = () => {
        navigation.navigate('Player', {playerId: playerId})
    }

    const handleFavouritePress = () => {
        favourite ? favouritesReducer('REMOVE', playerId) : favouritesReducer('ADD', playerId)
        setFavourite(prevState => !prevState)
    }

    return (
        <TouchableOpacity style={{backgroundColor: colours[index % 2], ...styles.playerRow}} onPress={handlePlayerRowPress}>
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
                <Text style={{width: (width * .07), textAlign: 'right', ...styles.text}}>{ageYears}</Text>
                <Text style={{width: (width * .15), textAlign: 'right', ...styles.text}}>{displayedPoints}</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleFavouritePress}>
                    {favourite ?
                        <Ionicons name="md-heart-empty" size={TEXT_FONT_SIZE * 1.3} /> :
                        <Ionicons name="md-add" size={TEXT_FONT_SIZE * 1.3} />}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
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
        alignItems: 'center',
        marginRight: 7
    },
    text: {
        fontSize: TEXT_FONT_SIZE,
        lineHeight: TEXT_FONT_SIZE * 1.3
    },
    displayRank: {
        width: (width * .085),
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
    },
    addButton: {
        width: (width * .08),
        height: (width * .08),
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});