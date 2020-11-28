import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

import {getStringDiff} from "../../shared/functions";
import {TITLE_FONT_SIZE, SHADOW_STYLING} from "../../shared/constants";

let {width} = Dimensions.get('window')

function ArticleCard(props) {
    let handlePress = () => {
        props.articleData.navigation.navigate('Article', {link: link})
    }

    const {image, title, newspaper, date, link} = props.articleData.item
    const timeDifference = getStringDiff(date)

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={{overflow: 'hidden'}}>
                <Image style={styles.thumbnail} source={image}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={3} ellipsizeMode='tail'>{title}</Text>
                <View style={styles.footerContainer}>
                    <Text numberOfLines={1} style={{flexShrink: 1, color: 'grey'}}>{newspaper}</Text>
                    <Text style={{color: 'grey'}}>{timeDifference}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: (width * 0.03),
        marginLeft: (width * 0.02),
        marginRight: (width * 0.02),
        padding: (width * 0.02),
        borderRadius: 7,
        backgroundColor: 'white',
        ...SHADOW_STYLING
    },
    thumbnail: {
        width: (width * 0.26),
        height: (width * 0.26),
        marginRight: (width * 0.02),
        borderRadius: 4,
        backgroundColor: '#f5f5f5',
    },
    textContainer: {
        flex: 1,
        padding: 2
    },
    title: {
        fontWeight: 'bold',
        fontSize: TITLE_FONT_SIZE,
        lineHeight: (TITLE_FONT_SIZE * 1.3),
        flex: 1
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default ArticleCard;