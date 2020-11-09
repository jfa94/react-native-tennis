import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

function Settings(props) {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Change stuff!</Text>
        </View>
    );
}

const Stack = createStackNavigator();

export default function SettingsScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
    );
}