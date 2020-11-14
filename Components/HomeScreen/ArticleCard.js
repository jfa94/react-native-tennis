import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

let {width} = Dimensions.get('window')

const TITLE_FONT_SIZE = 17;
const DESCRIPTION_FONT_SIZE = 15;

function ArticleCard(props) {
    let [usedTitleLines, setUsedTitleLines] = useState(0);

    const onLayout = useCallback((e) => {
        console.log(e.nativeEvent)
        setUsedTitleLines(Math.floor(e.nativeEvent.layout.height / TITLE_FONT_SIZE))
        console.log(usedTitleLines)
    }, [])

    let handlePress = () => {
        props.articleData.navigation.navigate('Article', {link: link})
    }

    const {image, title, newspaper, date, link, description} = props.articleData.item

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={{overflow: 'hidden'}}>
                <Image style={styles.thumbnail} source={image}/>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.titleAndDescContainer}>
                    <Text style={styles.title} numberOfLines={3} ellipsizeMode='tail' onLayout={onLayout}>{title}</Text>
                    {usedTitleLines === 3 ? null :
                        <Text
                            style={styles.description}
                            numberOfLines={3 - usedTitleLines}
                            ellipsizeMode='tail'>
                            {description}
                        </Text>
                    }
                </View>
                <View style={styles.footerContainer}>
                    <Text numberOfLines={1} style={{flexShrink: 1, color: 'grey'}}>{newspaper}</Text>
                    <Text style={{color: 'grey'}}>{date}</Text>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2
    },
    thumbnail: {
        width: width * 0.26,
        height: width * 0.26,
        marginRight: (width * 0.02),
        borderRadius: 4
    },
    textContainer: {
        flex: 1,
        padding: 2
    },
    titleAndDescContainer: {
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: TITLE_FONT_SIZE,
        marginBottom: 3
    },
    description: {
        flexShrink: 1,
        fontSize: DESCRIPTION_FONT_SIZE,
        lineHeight: DESCRIPTION_FONT_SIZE + 5
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default ArticleCard;