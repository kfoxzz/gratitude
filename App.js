import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import Main from './components/Main';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
