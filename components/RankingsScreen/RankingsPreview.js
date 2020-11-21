import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {SHADOW_STYLING} from '../../shared/constants.js'

const {width} = Dimensions.get('window')

function RankingsPreview(props) {
    let groupTitle
    switch(props.title) {
        case 'ATP_SINGLES': groupTitle = 'ATP Singles'; break;
        case 'WTA_SINGLES': groupTitle = 'WTA Singles'; break;
        case 'ATP_DOUBLES': groupTitle = 'ATP Doubles'; break;
        case 'WTA_DOUBLES': groupTitle = 'WTA Doubles'; break;
    }

    const PlayerRow = (props) => {
        const {playerName, rankingPoints, nationality} = props
        return (
            <View style={styles.playerRow}>
                <View style={styles.playerRowLeft}>
                    <Text>{nationality}</Text>
                    <Text>{playerName}</Text>
                </View>
                <View style={styles.playerRowRight}>
                    <Text>{rankingPoints}</Text>
                </View>
            </View>)
    }

    return (
        <TouchableOpacity style={styles.navButton} onPress={() => alert(`Navigate to ${groupTitle}`)}>
            <Text style={styles.groupTitle}>{groupTitle}</Text>
            {props.players.map(player => {
                return <PlayerRow key={player.playerId} {...player} />
            })}
            <Text style={{alignSelf: 'flex-end', color: 'grey'}}>
                {'Full rankings  '}
                <Ionicons name='md-arrow-forward' color='grey'/>
            </Text>
        </TouchableOpacity>
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
    playerRowRight: {

    },
    groupTitle: {
        fontWeight: 'bold'
    }
});

export default RankingsPreview;