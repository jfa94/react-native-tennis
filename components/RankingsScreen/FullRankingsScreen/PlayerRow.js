import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import {getHoursDiff} from "../../../shared/functions";
import {TEXT_FONT_SIZE} from "../../../shared/constants";

const {width} = Dimensions.get('window')

export default function PlayerRow (props) {
    // TODO: Make favourites persist
    const [favourite, setFavourite] = useState(false)

    const {index, playerName, rankingPoints, nationality, officialRanking, dateOfBirth} = props
    const displayRank = officialRanking > 999 ? '999+' : officialRanking
    const colours = ['#f5f5f5', 'white']

    const ageYears = Math.floor(getHoursDiff(dateOfBirth)/8760)

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
                <Text style={{width: (width * .07), textAlign: 'right', ...styles.text}}>{ageYears}</Text>
                <Text style={{width: (width * .15), textAlign: 'right', ...styles.text}}>{rankingPoints}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => setFavourite(prevState => !prevState)}>
                    {favourite ?
                        <Ionicons name="md-heart-empty" size={TEXT_FONT_SIZE * 1.3} /> :
                        <Ionicons name="md-add" size={TEXT_FONT_SIZE * 1.3} />}
                </TouchableOpacity>
            </View>
        </View>)
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