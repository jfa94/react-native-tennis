import React from "react";
import {ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ScreenLoadingIndicator({children}) {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            {children}
            <ActivityIndicator style={{flex: 1, alignSelf: 'center'}} size="small"/>
        </SafeAreaView>
    )
}