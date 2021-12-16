import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateEmailAsync } from '../redux/userSlice';

function ChangeEmail2(props) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /\S+@\S+\.\S+/;

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
    if (!email) {
        setError('Please enter your new email')
    } else if (email != confirmEmail) {
        setError('Emails do not match');
    } else if (!emailRegex.test(email)) {
        setError('Must be a valid email address')
    } else if (emailRegex.test(email) && email === confirmEmail) {
      setError('');
      await dispatch(updateEmailAsync(email));
      navigation.navigate('ConfirmEmailChange');
    }
  };

  return (
    <>
      <Header
        backgroundColor={colors.background}
        containerStyle={{ borderBottomColor: colors.background }}>
        <View style={styles.backButton}>
          <Button
            title="Cancel"
            onPress={() => props.navigation.navigate('Settings')}
            color="#FF8100"
          />
        </View>
      </Header>
      <StatusBar barStyle={colors.statusBar} translucent={true} />
      <View style={styles.viewContainer}>
        <Text style={styles.text}>Please enter your new email address.</Text>
        <TextInput
          placeholder="New Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
          placeholderTextColor={colors.inputPlaceholder}
        />
        <TextInput
          placeholder="Confirm New Email"
          value={confirmEmail}
          onChangeText={setConfirmEmail}
          style={styles.textInput}
          placeholderTextColor={colors.inputPlaceholder}
        />
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleConfirm}>
          <View style={styles.confirmButton}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
              Confirm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ChangeEmail2;
