import React, {useEffect} from 'react';
import {StatusBar} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import NewsScreen from './screens/NewsScreen';
import RankingsScreen from './screens/RankingsScreen';
import FixturesScreen from "./screens/FixturesScreen";
import TournamentsScreen from "./screens/TournamentsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function App() {
    useEffect(() => StatusBar.setBarStyle( 'dark-content' ), [])

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        switch (route.name) {
                            case 'News':
                                iconName = 'ios-paper';
                                break;
                            case 'Matches':
                                iconName = 'ios-tennisball'
                                break;
                            case 'Tournaments':
                                iconName = 'ios-calendar';
                                break;
                            case 'Rankings':
                                iconName = 'ios-trophy';
                                break;
                            case 'Profile':
                                iconName = 'ios-happy';
                                break;
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
            >
                <Tab.Screen name='News' component={NewsScreen}/>
                <Tab.Screen name='Matches' component={FixturesScreen}/>
                <Tab.Screen name='Tournaments' component={TournamentsScreen}/>
                <Tab.Screen name='Rankings' component={RankingsScreen}/>
                <Tab.Screen name='Profile' component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;