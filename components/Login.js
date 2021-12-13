import React, { useState } from 'react';
import Loading from './Loading';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../redux/userSlice';
import { useTheme } from '@react-navigation/native'; 
import { defineStyles } from '../components/helperFunctions/defineStyles';

function LoginError(props) {
  const loginError = useSelector(state => state.user.user.loginError);

  if (loginError) {
    return (
      <View>
        <Text style={{ color: 'red', paddingHorizontal: 20 }}>
          {loginError}
        </Text>
      </View>
    );
  } else {
    return <View></View>;
  }
}

function Login(props) {
  const { colors } = useTheme();

  // const styles = defineStyles(colors);

  const styles = StyleSheet.create({
    title: {
      fontSize: 40,
      fontWeight: '600',
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      marginBottom: 40,
      paddingTop: 20,
      color: '#FF8100',
    },
    textInput: {
      borderWidth: 1,
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      borderColor: colors.textInputBorder,
      borderRadius: 10,
      fontSize: 20,
      backgroundColor: colors.textInputColor,
      color: colors.text,
    },
    image: {
      height: 200,
      width: 200,
      alignSelf: 'center',
    },
    signIn: {
      backgroundColor: '#FF8100',
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
  });

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.user.user.loading);
  // const loading = true;

  const signIn = () => {
    const credentials = {
      email,
      password,
    };
    dispatch(signInUser(credentials));
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background,
      }}>
      <StatusBar barStyle={colors.statusBar} translucent={true} />
      <Image source={require('../assets/mandala.png')} style={styles.image} />
      <Text style={styles.title}>gratitude</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        returnKeyType="next"
        placeholderTextColor={colors.inputPlaceholder}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textInput}
        returnKeyType="done"
        placeholderTextColor={colors.inputPlaceholder}
      />
      <LoginError />
      <TouchableOpacity onPress={() => signIn()}>
        <View style={styles.signIn}>
          <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
            Sign in
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 18, color: colors.text }}>
          Need an account?
        </Text>
        <Button
          color="#FF8100"
          title="Sign up"
          onPress={() => props.navigation.navigate('Sign Up')}
        />
      </View>
      <Button
        color="#FF8100"
        title="Forgot password"
        onPress={() => console.log('Forgot password')}
      />
    </KeyboardAvoidingView>
  );
}

export default Login;
