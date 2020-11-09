import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = 'ios-home';
                                break;
                            case 'Settings':
                                iconName = 'ios-cog';
                                break;
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
            >
                <Tab.Screen name='Home' component={HomeScreen}/>
                <Tab.Screen name='Settings' component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;