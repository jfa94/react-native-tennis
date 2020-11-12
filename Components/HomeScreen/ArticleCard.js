import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

let {width} = Dimensions.get('window')

function ArticleCard(props) {
    let handlePress = () => {
        props.articleData.navigation.navigate('Article', {link: link})
    }

    const {image, title, newspaper, description, link} = props.articleData.item

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={{overflow: 'hidden'}}>
                <Image style={styles.thumbnail} source={image}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={3} ellipsizeMode='tail'>{title}</Text>
                <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: (width * 0.03),
        marginLeft: (width * 0.03),
        marginRight: (width * 0.03),
        padding: (width * 0.02),
        borderRadius: 7,
        backgroundColor: 'white',
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
        width: width * 0.26,
        height: width * 0.26,
        marginRight: (width * 0.02),
        borderRadius: 4
    },
    textContainer: {
        flex: 1,
        padding: 2,
        justifyContent: 'space-around',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    description: {
        marginTop: 2
    }
});

export default ArticleCard;