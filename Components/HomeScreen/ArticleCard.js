import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

let {width} = Dimensions.get('window')

function ArticleCard(props) {
    let handlePress = () => {
        props.navigation.navigate('Article', {link: props.articleData.link})
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={{overflow: 'hidden'}}>
                <Image style={styles.thumbnail} source={props.articleData.image}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.articleData.title}</Text>
                <Text style={styles.description}>{props.articleData.description}</Text>
                <Text style={styles.continueReading}>Continue reading...</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: (width * 0.03),
        marginLeft: (width * 0.03),
        marginRight: (width * 0.03),
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
    thumbnail: {
        width: width * 0.94,
        height: width * 0.6,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    textContainer: {
        height: width * 0.6,
        padding: 2,
        backgroundColor: 'white',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    title: {
        fontWeight: 'bold'
    },
    description: {
        marginTop: 2
    },
    continueReading: {
        alignSelf: 'flex-end'
    }
});

export default ArticleCard;