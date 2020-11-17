import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function TournamentsScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Calendar goes here</Text>
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

export default TournamentsScreen;