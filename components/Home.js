import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { useSelector, useDispatch } from 'react-redux';


export function Home() {
  // const count = useSelector(state => state.counter.value); // Redux example
  const dispatch = useDispatch(); // Redux example
  const userName = useSelector(state => state.user.name);

  // Example of how to dispatch an action:
  // onClick={() => dispatch(increment())

  return (
    <>
      <StatusBar  barStyle="dark-content" translucent={true} />
      <ScrollView style={styles.background}>
        <Swiper
          showsPagination={true}
          activeDotStyle={{ backgroundColor: '#FF8100' }}
          style={styles.swiper}>
          <View style={styles.slides}>
            <Image
              source={require('../assets/mandala.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Hello {userName}!</Text>
            <Text style={styles.subtitle}>
              Swipe to see how you are practicing gratitude in your life.
            </Text>
          </View>
          <View style={styles.slides}>
            <Text style={styles.cardTitle}>Daily Reprieve</Text>
            <Card containerStyle={styles.cardLight}>
              <Text style={styles.lightCounterText}>
                You have recorded your gratitude every day for{' '}
              </Text>
              <Text style={styles.lightCounter}>10 days</Text>
            </Card>
          </View>
          <View style={styles.slides}>
            <Text style={styles.cardTitle}>Total Logs</Text>
            <Card containerStyle={styles.cardLight}>
              <Text style={styles.lightCounterText}>
                You have logged what you are grateful for
              </Text>
              <Text style={styles.lightCounter}>10 times</Text>
            </Card>
          </View>
        </Swiper>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
  outerContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    paddingTop: 24,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontSize: 36,
    color: '#FF8100',
    fontWeight: '300',
  },
  cardTitle: {
    padding: 24,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontSize: 36,
    color: 'darkgray',
    fontWeight: '300',
  },
  subtitle: {
    fontSize: 24,
    padding: 40,
    textAlign: 'center',
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'darkgray',
  },
  background: {
    backgroundColor: 'white',
  },
  cardLight: {
    backgroundColor: '#FF8100',
    borderRadius: 10,
    marginBottom: 120,
  },
  lightCounterText: {
    paddingTop: 20,
    textAlign: 'center',
    padding: 24,
    fontSize: 22,
    fontWeight: '500',
    color: 'white',
  },
  lightCounter: {
    fontSize: 60,
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
  swiper: {
    height: 700,
  },
  slides: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Home;