import 'react-native-gesture-handler';
import React from 'react';
import Main from './components/Main';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, LightTheme } from './themes/theme';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Appearance } from 'react-native';

Appearance.getColorScheme();

export default function App() {

  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <SafeAreaProvider>
          <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : LightTheme}>
            <Main />
          </NavigationContainer>
        </SafeAreaProvider>
      </AppearanceProvider>
    </Provider>
  );
}