import React, {useContext} from 'react';
import {Text, View, ScrollView, SafeAreaView, StyleSheet, Dimensions} from 'react-native';

import {PlayersContext} from "../../context/PlayersContext";
import RankingsPreview from "./RankingsPreview";
import {HEADING_FONT_SIZE} from '../../shared/constants.js'

const {width} = Dimensions.get('window')

function RankingsLanding(props) {
    const {playerGroups} = useContext(PlayersContext)
    const supportedGroups = ['ATP_SINGLES', 'WTA_SINGLES', 'ATP_DOUBLES', 'WTA_DOUBLES']

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <Text style={styles.heading}>Rankings</Text>
                <View style={styles.buttonContainer}>
                    {supportedGroups.map((group) => {
                        return <RankingsPreview key={group} title={group} players={playerGroups[group]} />
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        marginTop: (width * 0.02),
        marginLeft: (width * 0.04),
        fontWeight: 'bold',
        fontSize: HEADING_FONT_SIZE
    },
    buttonContainer: {
        flex: 1,
    }
});

export default RankingsLanding;