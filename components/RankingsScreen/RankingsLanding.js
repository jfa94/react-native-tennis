import React, {useContext} from 'react';
import {Text, View, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions} from 'react-native';

import {PlayersContext} from "../../context/PlayersContext";

import {HEADING_FONT_SIZE, SHADOW_STYLING} from '../../shared/constants.js'

const {width} = Dimensions.get('window')

function NavButton (props) {
    const {players} = useContext(PlayersContext)

    const playerRow = (props) => {

    }

    return (
        <TouchableOpacity style={styles.navButton} onPress={() => alert('Navigate to ATP Doubles')}>
            <Text>{props.title}</Text>
            <Text>Player 1</Text>
            <Text>Player 2</Text>
            <Text>Player 3</Text>
            <Text>Player 4</Text>
            <Text>Player 5</Text>
        </TouchableOpacity>
    )
}


function RankingsLanding(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <Text style={styles.heading}>Rankings</Text>
                <View style={styles.buttonContainer}>
                    <NavButton title='ATP Singles' />
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
    },
    navButton: {
        marginTop: (width * 0.03),
        marginLeft: (width * 0.02),
        marginRight: (width * 0.02),
        padding: (width * 0.02),
        borderRadius: 7,
        backgroundColor: 'white',
        ...SHADOW_STYLING
    }
});

export default RankingsLanding;