import React, {useContext, useEffect} from "react";
import {View, ActivityIndicator, FlatList} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={'small'} />
            </View> :
            <View style={{flex: 1}}>
                <FlatList
                    data={articles}
                    renderItem={(item) => <ArticleCard articleData={{...item, navigation: props.navigation}} />}
                    keyExtractor={item => item.id}
                />
            </View>
    );
}

const Stack = createStackNavigator();

export default function HomeScreen() {
    return (
        <ArticleProvider>
            <Stack.Navigator>
                <Stack.Screen name="News Feed" component={NewsFeed}/>
                <Stack.Screen name="Article" component={ArticleScreen} options={{title: ''}}/>
            </Stack.Navigator>
        </ArticleProvider>
    );
}