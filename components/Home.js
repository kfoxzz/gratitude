import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Share,
} from 'react-native';
import { FAB } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEntriesAsync,
  calculateConsecutiveEntries,
} from '../redux/userSlice';
import { useTheme, useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export function Home(props) {
  const dispatch = useDispatch();

  const { colors } = useTheme();

  const navigation = useNavigation();

  const userName = useSelector(state => state.user.user.name);
  const consecEntries = useSelector(
    state => state.user.user.consecutiveEntries
  );
  const entries = useSelector(state => state.user.entries);
  const uid = useSelector(state => state.user.user.uid);

  useEffect(async () => {
    await dispatch(fetchEntriesAsync(uid));
  }, []);

  const onShareTotal = async () => {
    try {
      const result = await Share.share({
        message: `I have recorded my gratitude ${entries.length} times on the Gratitude app!`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onShareConsec = async () => {
    try {
      const result = await Share.share({
        message: `I have recorded my gratitude every day for ${consecEntries} days on the Gratitude app!`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onRefresh = async () => {
    try {
      await dispatch(fetchEntriesAsync(uid));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Animatable.View animation="fadeIn" iterationCount={1} duration={2000}>
      <StatusBar barStyle={colors.statusBar} translucent={true} />
      <ScrollView
        style={(styles.background, { backgroundColor: colors.background })}>
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
            <FAB
              title="Submit a New Entry"
              color={colors.shareButton}
              containerStyle={{ marginBottom: 10 }}
              titleStyle={{
                color: colors.shareButtonText,
                fontWeight: 'bold',
              }}
              onPress={() => navigation.navigate('NewEntryStack')}
            />
          </View>
          <View style={styles.slides}>
            <Text style={styles.cardTitle}>Daily Reprieve</Text>
            <View
              style={
                (styles.cardLight,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.background,
                  padding: 20,
                  paddingBottom: 75,
                })
              }>
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
            </View>
            {/* <FAB
              title="Refresh"
              color={colors.shareButton}
              containerStyle={{ marginBottom: 10 }}
              titleStyle={{
                color: colors.shareButtonText,
                fontWeight: 'bold',
              }}
              onPress={onRefresh}
            /> */}
            <FAB
              title="Share"
              color={colors.shareButton}
              containerStyle={{ marginBottom: 10 }}
              titleStyle={{
                color: colors.shareButtonText,
                fontWeight: 'bold',
              }}
              onPress={onShareConsec}
            />
          </View>
          <View style={styles.slides}>
            <Text style={styles.cardTitle}>Total Logs</Text>
            <View
              style={
                (styles.cardLight,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.background,
                  padding: 20,
                  paddingBottom: 75,
                })
              }>
              <LinearGradient
                style={styles.linearView}
                colors={['#FF8100', '#FFAD5B']}>
                <Text style={styles.lightCounterText}>
                  You have logged what you are grateful for
                </Text>
                <Text style={styles.lightCounter}>
                  {entries ? entries.length : '0'} times
                </Text>
              </LinearGradient>
            </View>
            <FAB
              title="Share"
              color={colors.shareButton}
              containerStyle={{ marginBottom: 10 }}
              titleStyle={{
                color: colors.shareButtonText,
                fontWeight: 'bold',
              }}
              onPress={onShareTotal}
            />
          </View>
        </Swiper>
      </ScrollView>
    </Animatable.View>
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
    borderRadius: 20,
    paddingBottom: 100,
    borderWidth: 1,
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
