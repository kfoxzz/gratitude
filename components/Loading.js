import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function Loading(props) {
    return (
        <View>
            <Image style={styles.image} source={require('../assets/spinner.gif')} />
            <Text>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 200
    },
    background: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Loading;