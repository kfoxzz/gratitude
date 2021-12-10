import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';

function Loading(props) {
    return (
      <>
        <SafeAreaView style={{ backgroundColor: '#fff' }} />
        <StatusBar barStyle="dark-content" translucent={true} />
        <ScrollView style={styles.background}>
          <View style={styles.imgView}>
            <Image
              style={styles.image}
              source={require('../assets/spinner.gif')}
            />
          </View>
        </ScrollView>
      </>
    );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
  imgView: {
    alignSelf: 'center',
    flex: 1,
    paddingTop: 250,
  },
  background: {
    backgroundColor: '#fff',
  },
});

export default Loading;