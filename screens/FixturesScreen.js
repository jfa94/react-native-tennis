import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function FixturesScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Matches go here</Text>
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

export default FixturesScreen;