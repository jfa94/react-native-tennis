import React from 'react';
import {Text, View, StyleSheet, Dimensions, ActivityIndicator, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {SHADOW_STYLING, TEXT_FONT_SIZE, TITLE_FONT_SIZE} from '../../shared/constants.js'

const {width} = Dimensions.get('window')

function RankingsPreview({title, players}) {
    let groupTitle
    switch (title) {
        case 'ATP_SINGLES':
            groupTitle = 'ATP Singles';
            break;
        case 'WTA_SINGLES':
            groupTitle = 'WTA Singles';
            break;
        case 'ATP_DOUBLES':
            groupTitle = 'ATP Doubles';
            break;
        case 'WTA_DOUBLES':
            groupTitle = 'WTA Doubles';
            break;
    }

    const PlayerRow = (props) => {
        const {playerName, rankingPoints, nationality, officialRanking} = props
        return (
            <View style={styles.playerRow}>
                <View style={styles.playerRowLeft}>
                    <Text style={{width: (width * .04), fontWeight: 'bold', ...styles.text}}>{`${officialRanking}`}</Text>
                    <View style={styles.flagContainer}>
                        <Image
                            style={nationality === 'CH' ? {...styles.flag, backgroundColor: '#FF0000'} : styles.flag}
                            source={{uri: `https://www.countryflags.io/${nationality}/flat/64.png`}}
                        />
                    </View>
                    <Text style={styles.text}>{playerName}</Text>
                </View>
                <View style={styles.playerRowRight}>
                    <Text style={styles.text}>{rankingPoints}</Text>
                </View>
            </View>)
    }

    return (
        <View style={styles.navButton}>
            <Text style={styles.groupTitle}>{groupTitle}</Text>
            {!players ? <ActivityIndicator size="small"/> :
                players.map(player => {
                    return <PlayerRow key={player.playerId} {...player} />
                })}
            <Text style={styles.fullRankingsLabel}>
                {'Full rankings  '}
                <Ionicons name='md-arrow-forward' color='grey'/>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navButton: {
        marginTop: (width * 0.03),
        marginLeft: (width * 0.02),
        marginRight: (width * 0.02),
        padding: (width * 0.02),
        borderRadius: 7,
        backgroundColor: 'white',
        ...SHADOW_STYLING
    },
    playerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    playerRowLeft: {
        flexDirection: 'row'
    },
    playerRowRight: {},
    groupTitle: {
        fontWeight: 'bold',
        fontSize: TITLE_FONT_SIZE,
        marginBottom: 5
    },
    text: {
        fontSize: TEXT_FONT_SIZE,
        lineHeight: TEXT_FONT_SIZE * 1.3
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
    fullRankingsLabel: {
        alignSelf: 'flex-end',
        color: 'grey',
        marginTop: 5
    }
});

export default RankingsPreview;