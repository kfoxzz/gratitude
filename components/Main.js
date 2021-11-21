import React from 'react';
import Home from './Home';
import NewEntry from './NewEntry';
import PreviousEntries from './PreviousEntries';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

function Main() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: '#FF8100',
        drawerType: 'front',
      }}
      drawerContent={props => {
        return (
          <SafeAreaView style={styles.customDrawerContent}>
            <View
              style={{
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/mandala.png')}
                style={styles.drawerImage}
              />
              <Text style={styles.drawerText}>gratitude</Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="New Entry" component={NewEntry} />
      <Drawer.Screen name="My Entries" component={PreviousEntries} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
    flex: 1,
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8100',
  },
  customDrawerContent: {
    paddingBottom: 20,
    flex: 1,
    margin: 10,
  }
});

export default Main;