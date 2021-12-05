import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';

function Step3(props) {
    const [goals, setGoals] = useState('');

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    }}>
    <ScrollView style={styles.background}>
      <Text style={styles.question}>What goals am I working toward today?</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="List at least 1 goal you are working toward today."
        onChangeText={text => setGoals(text)}
        value={goals}
      />
      <View>
        <Button
          title="Next"
          color="#FF8100"
          onPress={() => props.navigation.navigate('Step 4')}
        />
        <Button
          title="Back"
          color="#FF8100"
          onPress={() => props.navigation.navigate('Step 2')}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
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
    paddingTop: 11,
    borderRadius: 6,
    borderColor: 'lightgray',
    fontSize: 18,
  },
});

export default Step3;
