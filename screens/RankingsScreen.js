import React, {useState, useEffect, useCallback} from 'react';
import {
    Text,
    View,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";

import FullRankingsScreen from "./rankings/FullRankingsScreen";
import RankingsPreview from "../components/RankingsScreen/RankingsPreview";
import ScreenLoadingIndicator from "../shared/components/ScreenLoadingIndicator";

import {readRankings, refreshRankings} from "../api/playersApi";
import {getHoursDiff} from "../shared/functions.js";
import {HEADING_FONT_SIZE, SUPPORTED_RANKINGS} from '../shared/constants.js'
import PlayerScreen from "./rankings/PlayerScreen";

const {width} = Dimensions.get('window')

function RankingsLanding({navigation}) {
    let [latestRankings, setLatestRankings] = useState(null)
    let [refreshing, setRefreshing] = useState(false)
    const refreshThreshold = (24 * 31)

    const Header = <Text style={styles.heading}>Rankings</Text>

    const doRankingsRefresh = useCallback(async () => {
        setRefreshing(true)
        let localRankings = await readRankings()

        if (latestRankings == null || getHoursDiff(latestRankings?.metaData?.validFrom) > refreshThreshold) {
            await refreshRankings()
            localRankings = await readRankings()
            setLatestRankings(localRankings)
            setRefreshing(false)
        } else if (getHoursDiff(latestRankings?.metaData?.validFrom) <= refreshThreshold) {
            setLatestRankings(localRankings)
            setRefreshing(false)
        } else {
            console.warn(`Time difference: ${getHoursDiff(latestRankings.metaData.validFrom)}`)
        }
    }, [])

    useEffect(() => {
        doRankingsRefresh()
    }, [doRankingsRefresh])

    return (
        latestRankings == null ?
            <ScreenLoadingIndicator>
                {Header}
            </ScreenLoadingIndicator> :
            <SafeAreaView style={{flex: 1}}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={doRankingsRefresh}/>}>
                    {Header}
                    <View style={styles.buttonContainer}>
                        {SUPPORTED_RANKINGS.map((category) => {
                            return (
                                <TouchableOpacity key={category} onPress={() => navigation.navigate("Rankings", {
                                    category: category
                                })}>
                                    <RankingsPreview
                                        title={category}
                                        players={latestRankings[category].slice(0, 5)}
                                        navigation={navigation}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
}

const Stack = createStackNavigator();

export default function NewsScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Landing" component={RankingsLanding} options={{headerShown: false}}/>
            <Stack.Screen name="Rankings" component={FullRankingsScreen} options={{headerBackTitle: "Back"}}/>
            <Stack.Screen name="Player" component={PlayerScreen} options={{headerBackTitle: "Back"}}/>
        </Stack.Navigator>
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
    activityIndicator: {
        flex: 1,
        alignSelf: 'center'
    }
});