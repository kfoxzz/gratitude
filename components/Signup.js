import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, View, ScrollView, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/userSlice';

function Signup(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const signedIn = useSelector(state => state.user.signedIn);

    const resetForm = () => {
      setName('');
      setEmail('');
      // setPhone('');
      setPassword('');
    }

    const signUp = () => {
      const userData = {
        name,
        email,
        // phone,
        password
      };
      dispatch(createUser(userData));
      resetForm();
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          paddingTop: 30,
          backgroundColor: 'white',
        }}>
        <Text style={styles.title}>Sign Up</Text>
        <ScrollView style={styles.inputView}>
          <Text style={styles.inputTitle}>Name</Text>
          <Input
            placeholder="First name"
            value={name}
            onChangeText={setName}
            style={styles.textInput}
          />
          <Text style={styles.inputTitle}>Email</Text>
          <Input
            placeholder="Your email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
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
          />
          <Text style={styles.inputTitle}>Confirm Password</Text>
          <Input
            placeholder="Password"
            // value={password}
            // onChangeText={setPassword}
            secureTextEntry
            style={styles.textInput}
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

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 20,
    paddingTop: 20,
    color: '#FF8100',
    fontWeight:'500'
  },
  textInput: {
    fontSize: 16,
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
    fontWeight: '600'
  },
});

export default Signup;