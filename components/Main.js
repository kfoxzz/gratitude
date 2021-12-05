import React, { useState } from 'react';
import Home from './Home';
import NewEntry from './NewEntry';
import PreviousEntries from './PreviousEntries';
import Login from './Login';
import Signup from './Signup';
import Settings from './Settings';
import Step1 from './formSteps/Step1';
import Step2 from './formSteps/Step2';
import Step3 from './formSteps/Step3';
import Step4 from './formSteps/Step4';
import Step5 from './formSteps/Step5';
import Step6 from './formSteps/Step6';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
      <Drawer.Screen name="New Entry" component={NewEntryNavigation} />
      <Drawer.Screen name="My Entries" component={PreviousEntries} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

function MainNavigation() {

  const signedIn = useSelector(state => state.user.signedIn); // Redux example

  return (
    <Stack.Navigator initialRouteName="Home">
      {signedIn ? (
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign Up"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function NewEntryNavigation() {
  return (
    <Stack.Navigator initialRouteName="Step 1">
      <Stack.Screen
        name="Step 1"
        component={Step1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step 2"
        component={Step2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step 3"
        component={Step3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step 4"
        component={Step4}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step 5"
        component={Step5}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step 6"
        component={Step6}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
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

export default MainNavigation;