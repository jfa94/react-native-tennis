import React, {useContext, useEffect} from "react";
import {StatusBar, ActivityIndicator, FlatList} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaView} from "react-native-safe-area-context";

import ArticleCard from "../Components/HomeScreen/ArticleCard";
import ArticleScreen from "./ArticleScreen";

import {ArticleProvider, ArticleContext} from "../Context/ArticleContext";


function NewsFeed(props) {
    const {articles, isLoading, refreshArticles} = useContext(ArticleContext)

    useEffect(() => {
        refreshArticles()
    }, [])

    return (
        isLoading ?
            <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator size="small" />
            </SafeAreaView> :
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    data={articles}
                    renderItem={(item) => <ArticleCard articleData={{...item, navigation: props.navigation}} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
    );
}

const Stack = createStackNavigator();

export default function NewsScreen() {
    return (
        <ArticleProvider>
            <Stack.Navigator>
                <Stack.Screen name="News Feed" component={NewsFeed} options={{headerShown: false}}/>
                <Stack.Screen name="Article" component={ArticleScreen} options={{title: "", headerBackTitle: "Back"}}/>
            </Stack.Navigator>
        </ArticleProvider>
    );
}