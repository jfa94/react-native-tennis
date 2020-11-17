import React, {useContext, useEffect} from "react";
import {Text, ActivityIndicator, FlatList, Dimensions, StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaView} from "react-native-safe-area-context";

import ArticleCard from "../components/NewsScreen/ArticleCard";
import ArticleScreen from "../components/NewsScreen/ArticleScreen";
import {HEADING_FONT_SIZE} from "../shared/constants";

import {ArticleProvider, ArticleContext} from "../context/ArticleContext";

let {width} = Dimensions.get('window')

function NewsFeed(props) {
    const {articles, isLoading, refreshArticles} = useContext(ArticleContext)

    const FlatListHeader = (
        <Text style={styles.header}>
            News Feed
        </Text>
    )

    const FlatListFooter = (
        <Text style={styles.footer}>
            You're all caught up!
        </Text>
    )

    useEffect(() => {
        refreshArticles()
    }, [])

    return (
        isLoading ?
            <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator size="small"/>
            </SafeAreaView> :
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    ListHeaderComponent={FlatListHeader}
                    ListFooterComponent={FlatListFooter}
                    data={articles}
                    renderItem={(item) => <ArticleCard articleData={{...item, navigation: props.navigation}}/>}
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