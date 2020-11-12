import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import NewsScreen from './Screens/NewsScreen';
import SettingsScreen from './Screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function App() {
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
                            case 'Settings':
                                iconName = 'ios-cog';
                                break;
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
            >
                <Tab.Screen name='News' component={NewsScreen} />
                <Tab.Screen name='Settings' component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;