import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { resetPasswordAsync } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');

  const { colors } = useTheme();

  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    viewContainer: {
      padding: 20,
    },
    text: {
      color: colors.text,
      paddingBottom: 20
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
    confirmButton: {
      backgroundColor: '#FF8100',
      borderRadius: 10,
      padding: 10,
      margin: 10,
      marginHorizontal: 18
    },
    backButton: {
      alignSelf: 'flex-start',
      width: 80,
    },
  });

  const handleConfirm = async () => {
    await dispatch(resetPasswordAsync(email));
    Alert.alert(
      'Password Reset',
      'A link has been sent to your email to reset your password.',
      [
        { text: 'OK', onPress: () => props.navigation.navigate('Login') },
      ]
    );
  }

  return (
    <>
      <Header
        backgroundColor={colors.background}
        containerStyle={{ borderBottomColor: colors.background }}>
        <View style={styles.backButton}>
          <Button
            title="Back"
            onPress={() => props.navigation.navigate('Login')}
            color="#FF8100"
          />
        </View>
      </Header>
      <StatusBar barStyle={colors.statusBar} translucent={true} />
      <View style={styles.viewContainer}>
        <Text style={styles.text}>
          Please enter the email address associated with your account.
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
          placeholderTextColor={colors.inputPlaceholder}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleConfirm}>
          <View style={styles.confirmButton}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
              Reset password
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ForgotPassword;
