import React, {useContext, useEffect} from "react";
import {Text, ActivityIndicator, FlatList, Dimensions} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaView} from "react-native-safe-area-context";

import ArticleCard from "../Components/HomeScreen/ArticleCard";
import ArticleScreen from "./ArticleScreen";

import {ArticleProvider, ArticleContext} from "../Context/ArticleContext";

let {width} = Dimensions.get('window')

function NewsFeed(props) {
    const {articles, isLoading, refreshArticles} = useContext(ArticleContext)

    const FlatListHeader = (
        <Text style={{marginLeft: (width * 0.04), fontWeight: 'bold', fontSize: 32}}>
            News Feed
        </Text>
    )

    const FlatListFooter = (
        <Text style={{alignSelf: 'center', marginTop: (width * 0.03), fontSize: 12}}>
            You're all caught up!
        </Text>
    )

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
                    ListHeaderComponent={FlatListHeader}
                    ListFooterComponent={FlatListFooter}
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