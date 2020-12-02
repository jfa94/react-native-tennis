import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function PlayerScreen({navigation, route}) {
    return (
        <View>
            <Text>Player ID: {route.params.playerId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default PlayerScreen;