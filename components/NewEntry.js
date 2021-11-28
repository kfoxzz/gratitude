import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import AnimatedMultistep from 'react-native-animated-multistep';
import { createUser } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';


// WHERE I LEFT OFF:
// 1. Add steps as separate components (each question is a different step)
// 2. Change NewEntry to return AnimatedMultistep component with steps
// Readme: https://github.com/samad324/react-native-animated-multistep#readme

export function NewEntry() {

  const dispatch = useDispatch();
  const signedIn = useSelector(state => state.user.signedIn);

  // Questions to add:
  // What goals am I working toward today?
  // I love myself because... [List 10 things you love about yourself.]
  // What can I do to love myself today?
  // List 10 things you love about other people in your life.
  // What can I do to help another person today?
  // What am I looking forward to today?

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.question}>I am grateful for...</Text>
      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        multiline
        placeholder="List 10 things you are grateful for."
      />
      <Text style={styles.question}>Have I taken time to meditate today?</Text>
      <View>
        <Button title="Submit" color="#FF8100" onPress={() => console.log(signedIn)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    height: 200,
  },
  question: {
    fontSize: 32,
    fontWeight: '600',
    padding: 24,
  },
  input: {
    margin: 12,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: 'lightgray',
    fontSize: 18,
  },
});

export default NewEntry;
