import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import NewsFeed from "../components/NewsScreen/NewsFeed";
import ArticleScreen from "../components/NewsScreen/ArticleScreen";


const Stack = createStackNavigator();

export default function NewsScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="News Feed" component={NewsFeed} options={{headerShown: false}}/>
            <Stack.Screen name="Article" component={ArticleScreen} options={{title: "", headerBackTitle: "Back"}}/>
        </Stack.Navigator>
    );
}
