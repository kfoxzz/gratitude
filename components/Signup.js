import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/userSlice';
import { useTheme } from '@react-navigation/native';
import Loading from './Loading';

function Signup(props) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: 40,
      margin: 20,
      color: '#FF8100',
      fontWeight: '500',
    },
    textInput: {
      fontSize: 16,
      color: colors.text,
      borderBottomColor: 'red'
    },
    signUp: {
      backgroundColor: '#FF8100',
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
    inputView: {
      marginHorizontal: 10,
    },
    inputTitle: {
      paddingHorizontal: 10,
      padding: 10,
      fontSize: 18,
      fontWeight: '600',
      color: colors.text
    },
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [nameValidated, setNameValidated] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);  

  const dispatch = useDispatch();

  const signedIn = useSelector(state => state.user.signedIn);
  const loading = useSelector(state => state.user.user.loading);


  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const resetForm = () => {
    setName('');
    setEmail('');
    // setPhone('');
    setPassword('');
    setConfirmPassword('');
  };

  const validateName = () => {
    if (name.length < 2) {
      setNameError('Must be at least 2 characters');
      setNameValidated(false);
    } else {
      setNameError('');
      setNameValidated(true);
    }
  }

  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmailError('Must be a valid email');
      setEmailValidated(false);
    } else {
      setEmailError('');
      setEmailValidated(true);
    }
  }

  const validatePassword = () => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be minimum 8 characters, at least one letter, one number and one special character'
      );
      setPasswordValidated(false);
    } else {
      setPasswordError('');
      setPasswordValidated(true);
    }
  }

  const validateConfirmPassword = () => {
    if (confirmPassword != password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  }

  const signUp = () => {
    if (
      nameValidated &&
      emailValidated &&
      passwordValidated &&
      (password === confirmPassword)
    ) {
      const userData = {
        name,
        email,
        // phone,
        password,
      };
      dispatch(createUser(userData));
      resetForm();
    } else {
      console.log(nameValidated, emailValidated, passwordValidated, password, confirmPassword)
    }
  };

  if (loading) {
    return <Loading />
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          paddingTop: 30,
          backgroundColor: colors.background,
        }}>
        <Text style={styles.title}>Sign Up</Text>
        <ScrollView style={styles.inputView}>
          <Text style={styles.inputTitle}>Name</Text>
          <Input
            placeholder="First name"
            value={name}
            onChangeText={setName}
            style={styles.textInput}
            keyboardAppearance={colors.keyboard}
            errorMessage={nameError}
            onEndEditing={validateName}
          />
          <Text style={styles.inputTitle}>Email</Text>
          <Input
            placeholder="Your email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
            keyboardAppearance={colors.keyboard}
            errorMessage={emailError}
            onEndEditing={validateEmail}
          />
          {/* <Text style={styles.inputTitle}>Phone</Text> */}
          {/* <Input
            placeholder="Your phone number"
            value={phone}
            onChangeText={setPhone}
            style={styles.textInput}
          /> */}
          <Text style={styles.inputTitle}>Password</Text>
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.textInput}
            errorMessage={passwordError}
            onEndEditing={validatePassword}
          />
          <Text style={styles.inputTitle}>Confirm Password</Text>
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.textInput}
            errorMessage={confirmPasswordError}
            onEndEditing={validateConfirmPassword}
          />
          <TouchableOpacity onPress={() => signUp()}>
            <View style={styles.signUp}>
              <Text
                style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
                Sign up
              </Text>
            </View>
          </TouchableOpacity>
          <Button
            title="Go back"
            color="#FF8100"
            onPress={() => props.navigation.navigate('Login')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Signup;
