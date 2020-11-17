import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function RankingsScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Players go here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RankingsScreen;