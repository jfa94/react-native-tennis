import React, {useEffect, useState} from "react";
import {Text, FlatList, Dimensions, StyleSheet, StatusBar, RefreshControl} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {createStackNavigator} from "@react-navigation/stack";

import ArticleScreen from "./news/ArticleScreen";
import ArticleCard from "../components/NewsScreen/ArticleCard";
import ScreenLoadingIndicator from "../shared/components/ScreenLoadingIndicator";

import {HEADING_FONT_SIZE} from "../shared/constants";

// TODO: Replace with API call
import * as articleList from '../shared/dummyData/ARTICLES.js'

let {width} = Dimensions.get('window')

function NewsFeed(props) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    const Header = <Text style={styles.header}>News Feed</Text>

    const refreshArticles = async () => {
        setRefreshing(true)
        // TODO: Replace with API call
        await setTimeout(() => {
            setArticles(articleList.default)
            setIsLoading(false)
            setRefreshing(false)
        }, 1500)
    }

    useEffect(() => {
        StatusBar.setBarStyle( 'dark-content' )
        setIsLoading(true)
        refreshArticles()
    }, [])

    return (
        isLoading ?
            <ScreenLoadingIndicator>
                {Header}
            </ScreenLoadingIndicator> :
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    ListHeaderComponent={Header}
                    ListFooterComponent={<Text style={styles.footer}>You're all caught up!</Text>}
                    data={articles}
                    renderItem={(item) =>
                        <ArticleCard articleData={{...item, navigation: props.navigation}}/>
                    }
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshArticles} />}
                />
            </SafeAreaView>
    );
}

const Stack = createStackNavigator();

export default function NewsScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="News Feed" component={NewsFeed} options={{headerShown: false}}/>
            <Stack.Screen name="Article" component={ArticleScreen} options={{title: "", headerBackTitle: "Back"}}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    header: {
        marginLeft: (width * 0.04),
        marginTop: (width * 0.02),
        fontWeight: 'bold',
        fontSize: HEADING_FONT_SIZE
    },
    footer: {
        alignSelf: 'center',
        marginTop: (width * 0.03),
        fontSize: 12
    }
})