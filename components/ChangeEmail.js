import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { reauthenticateUserAsync, authenticated } from '../redux/userSlice';

function ChangeEmail(props) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginError = useSelector(state => state.user.user.loginError);
  const userAuthenticated = useSelector(state => state.user.user.authenticated);

  const email = useSelector(state => state.user.user.email);

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: '300',
      fontStyle: 'italic',
      color: 'darkgray',
      paddingBottom: 30,
    },
    editView: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    viewContainer: {
      padding: 20,
    },
    confirmButton: {
      backgroundColor: '#FF8100',
      borderRadius: 10,
      padding: 10,
      margin: 10,
      marginHorizontal: 18,
      marginBottom: 40,
    },
    backButton: {
      alignSelf: 'flex-start',
      width: 80,
    },
    textInput: {
      borderWidth: 1,
      padding: 10,
      marginTop: 10,
      borderColor: colors.textInputBorder,
      borderRadius: 10,
      fontSize: 20,
      backgroundColor: colors.textInputColor,
      color: colors.text,
    },
    text: {
      color: colors.text,
      paddingBottom: 20,
      fontSize: 18,
    },
  });

  const handleConfirm = async () => {
    if (!password) {
      setError('Please enter your password');
    } else {
      setError('');
      await dispatch(
        reauthenticateUserAsync({
          email,
          password,
        })
      );
      if (userAuthenticated) {
        await dispatch(authenticated(false));
        navigation.navigate('ChangeEmail2');
      } else {
        console.log('Error logging in');
      }
    }
  };

  return (
    <>
      <Header backgroundColor={colors.background} containerStyle={{ borderBottomColor: colors.background }}>
        <View style={styles.backButton}>
          <Button title="Cancel" onPress={() => props.navigation.navigate('Settings')} color="#FF8100" />
        </View>
      </Header>
      <StatusBar barStyle={colors.statusBar} translucent={true} />
      <ScrollView style={styles.viewContainer}>
        <Text style={styles.text}>Please enter your password to continue.</Text>
        <Text style={{ fontWeight: 'bold' }}>{email}</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry
          placeholderTextColor={colors.inputPlaceholder}
        />
        <Text style={{ color: 'red' }}>{error}</Text>
        <Text style={{ color: 'red' }}>{loginError}</Text>
      </ScrollView>
      <View>
        <TouchableOpacity onPress={handleConfirm}>
          <View style={styles.confirmButton}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ChangeEmail;
