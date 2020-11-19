import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {PlayersProvider} from "../context/PlayersContext";
import RankingsLanding from "../components/RankingsScreen/RankingsLanding";

export default function NewsScreen() {
    return (
        <PlayersProvider>
            <Stack.Navigator>
                <Stack.Screen name="Landing" component={RankingsLanding} options={{headerShown: false}}/>
            </Stack.Navigator>
        </PlayersProvider>
    );
}

const Stack = createStackNavigator();
