import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import Spinner from '../assets/spinner2.svg';

function Loading(props) {

  const { colors } = useTheme();

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
      backgroundColor: colors.background,
    },
  });

    return (
      <>
        <SafeAreaView style={styles.background} />
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

export default Loading;