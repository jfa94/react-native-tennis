import React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

function ArticleScreen(props) {
    return (
        <WebView
            source={props.route.params.link}
            showsHorizontalScrollIndicator={false}
        />
    );
}

export default ArticleScreen;