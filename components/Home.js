import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import Loading from './Loading';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEntriesAsync,
  totalEntries,
  calculateConsecutiveEntries,
} from '../redux/userSlice';

// LEFT OFF HERE:
// ".map is not a function" on re-render
// ".length is not a function" when attempting to get consec entries first time. On re-render, no error

export function Home() {
  const dispatch = useDispatch();

  const userName = useSelector(state => state.user.user.name);
  const consecEntries = useSelector(
    state => state.user.user.consecutiveEntries
  );
  const entries = useSelector(state => state.user.entries);
  const loading = useSelector(state => state.user.user.loading);

  useEffect(async () => {
    const dateArray = entries.map(entry => entry.date);
    await dispatch(calculateConsecutiveEntries(dateArray));
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" translucent={true} />
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
                <LinearGradient
                  style={styles.linearView}
                  colors={['#FF8100', '#FFAD5B']}>
                  <Text style={styles.lightCounterText}>
                    You have recorded your gratitude every day for{' '}
                  </Text>
                  <Text style={styles.lightCounter}>
                    {consecEntries ? consecEntries : '0'} days
                  </Text>
                </LinearGradient>
              </Card>
            </View>
            <View style={styles.slides}>
              <Text style={styles.cardTitle}>Total Logs</Text>
              <Card containerStyle={styles.cardLight}>
                <LinearGradient
                  style={styles.linearView}
                  colors={['#FF8100', '#FF9B37', '#FFBF80']}>
                  <Text style={styles.lightCounterText}>
                    You have logged what you are grateful for
                  </Text>
                  <Text style={styles.lightCounter}>
                    {entries ? entries.length : '0'} times
                  </Text>
                </LinearGradient>
              </Card>
            </View>
          </Swiper>
        </ScrollView>
      </>
    );
  }
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
    borderRadius: 20,
    marginBottom: 120,
    padding: 0,
  },
  linearView: {
    borderRadius: 20,
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
