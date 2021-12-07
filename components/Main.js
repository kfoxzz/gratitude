import React, { useState } from 'react';
import Home from './Home';
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
import SubmitForm from './formSteps/SubmitForm';
import Entry from './Entry';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { addEntryAsync } from '../redux/userSlice';

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
      <Drawer.Screen name="My Entries" component={PreviousEntriesNavigation} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

function MainNavigation() {

  const signedIn = useSelector(state => state.user.user.signedIn);
  // const signedIn = true; // for testing purposes

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

function PreviousEntriesNavigation(props) {
  return (
    <Stack.Navigator initialRouteName="Entries">
      <Stack.Screen
        name="Entries"
        component={PreviousEntries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="My Entry"
        options={{ headerShown: false }}
        component={Entry}
      />
    </Stack.Navigator>
  );
}

function NewEntryNavigation(props) {

  const dispatch = useDispatch();
  const entries = useSelector(state => state.user);

  const [newEntry, setNewEntry] = useState({
    gratitudeList: '',
    meditation: false,
    goals: '',
    selflove: '',
    selfloveAction: '',
    loveAboutPeople: '',
    helpOthers: '',
    lookingForwardTo: '',
    date: '',
    id: '',
    uid: ''
  });

  const updateEntry = (data) => {
    setNewEntry(data); 
  }

  const submitEntry = async () => {
    await dispatch(addEntryAsync(newEntry));
  }

  const clearForm = () => {
    setNewEntry({
      gratitudeList: '',
      meditation: false,
      goals: '',
      selflove: '',
      selfloveAction: '',
      loveAboutPeople: '',
      helpOthers: '',
      lookingForwardTo: '',
      date: '',
      id: '',
      uid: '',
    });
  }

  return (
    <Stack.Navigator initialRouteName="Step 1">
      <Stack.Screen name="Step 1" options={{ headerShown: false }}>
        {props => (
          <Step1
            {...props}
            newEntry={newEntry}
            updateEntry={data => updateEntry(data)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Step 2" options={{ headerShown: false }}>
        {props => (
          <Step2
            {...props}
            newEntry={newEntry}
            updateEntry={data => updateEntry(data)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Step 3" options={{ headerShown: false }}>
        {props => (
          <Step3
            {...props}
            newEntry={newEntry}
            updateEntry={data => updateEntry(data)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Step 4" options={{ headerShown: false }}>
        {props => (
          <Step4
            {...props}
            newEntry={newEntry}
            updateEntry={data => updateEntry(data)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Step 5" options={{ headerShown: false }}>
        {props => (
          <Step5
            {...props}
            newEntry={newEntry}
            updateEntry={data => updateEntry(data)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Step 6" options={{ headerShown: false }}>
        {props => (
          <Step6
            {...props}
            newEntry={newEntry}
            updateEntry={data => updateEntry(data)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Submit Form" options={{ headerShown: false }}>
        {props => (
          <SubmitForm
            {...props}
            newEntry={newEntry}
            updateEntry={data => updateEntry(data)}
            submitEntry={submitEntry}
            clearForm={clearForm}
          />
        )}
      </Stack.Screen>
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