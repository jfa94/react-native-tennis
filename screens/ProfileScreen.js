import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function ProfileScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Options go here</Text>
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

export default ProfileScreen;