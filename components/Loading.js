import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg"
import * as Animatable from 'react-native-animatable';


function Loading(props) {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    image: {
      height: 100,
      width: 100,
    },
    imgView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });

    return (
      <>
        <SafeAreaView style={styles.background} />
        <StatusBar barStyle="dark-content" translucent={true} />
        <View style={styles.imgView}>
          <Animatable.View
            animation="bounce"
            iterationCount="infinite"
            duration={3000}>
            <Image
              style={styles.image}
              source={require('../assets/mandala.png')}
            />
            {/* <Svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                margin: 'auto',
                background: '0 0',
                display: 'block',
                shapeRendering: 'auto',
              }}
              width={200}
              height={200}
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid">
              <Path
                d="M10 50a40 40 0 0 0 80 0 40 42.9 0 0 1-80 0"
                fill="#ff8100"></Path>
            </Svg> */}
          </Animatable.View>
        </View>
      </>
    );
}

export default Loading;