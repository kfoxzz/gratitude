import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button, KeyboardAvoidingView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { signInUser } from '../redux/userSlice';


function Login(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
      const credentials = {
        email,
        password
      };
      dispatch(signInUser(credentials));
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <StatusBar barStyle="dark-content" translucent={true} />
        <Image source={require('../assets/mandala.png')} style={styles.image} />
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.textInput}
        />
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
          <Text style={{ fontSize: 18 }}>Need an account?</Text>
          <Button
            color="#FF8100"
            title="Sign up"
            onPress={() => props.navigation.navigate('Sign Up')}
          />
        </View>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
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
    borderColor: 'lightgray',
    borderRadius: 10,
    fontSize: 20,
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

export default Login;