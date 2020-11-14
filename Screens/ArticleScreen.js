import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import WebView from 'react-native-webview';

function ArticleScreen(props) {
    useEffect(() => StatusBar.setBarStyle( 'dark-content' ), [])

    return (
        <WebView
            source={props.route.params.link}
            showsHorizontalScrollIndicator={false}
        />
    );
}

export default ArticleScreen;