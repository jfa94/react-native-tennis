import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {FavouritesContext} from "../context/FavouritesContext";

import {SUPPORTED_RANKINGS} from "../shared/constants";

function ProfileScreen(props) {
    const [loading, setLoading] = useState(true)
    const [playersLists, setPlayersLists] = useState({})
    const {favourites} = useContext(FavouritesContext)

    return (
        <View style={styles.container}>
            <Text>Favourite Players:</Text>
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