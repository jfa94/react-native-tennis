import React, {useContext} from 'react';
import {Text, View, ScrollView, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";

import RankingsPreview from "../components/RankingsScreen/RankingsPreview";

import {PlayersProvider, PlayersApi} from "../api/playersApi";
import {HEADING_FONT_SIZE, SUPPORTED_RANKINGS} from '../shared/constants.js'

const {width} = Dimensions.get('window')

function RankingsLanding() {
    const {playerCategories} = useContext(PlayersApi)
    console.log(playerCategories)

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <Text style={styles.heading}>Rankings</Text>
                <View style={styles.buttonContainer}>
                    {SUPPORTED_RANKINGS.map((category) => {
                        return <RankingsPreview key={category} title={category} players={playerCategories[category]} />
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Stack = createStackNavigator();

export default function NewsScreen() {
    return (
        <PlayersProvider>
            <Stack.Navigator>
                <Stack.Screen name="Landing" component={RankingsLanding} options={{headerShown: false}}/>
            </Stack.Navigator>
        </PlayersProvider>
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