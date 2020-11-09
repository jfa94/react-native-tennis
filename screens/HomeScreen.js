import * as React from "react";
import {View, Text} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import ArticleCard from "../Components/HomeScreen/ArticleCard";
import ArticleScreen from "./ArticleScreen";

import ARTICLES from '../DummyData/ARTICLES.js';
let exampleArticle = ARTICLES["1"]

function Home(props) {
    return (
        <View style={{flex: 1}}>
            <ArticleCard articleData={exampleArticle} navigation={props.navigation} />
        </View>
    );
}

const Stack = createStackNavigator();

export default function HomeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    );
}