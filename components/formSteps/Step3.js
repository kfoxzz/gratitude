import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';

function Step3(props) {
    const [goals, setGoals] = useState('');

    useEffect(() => {
      if (props.newEntry.goals) {
        setGoals(props.newEntry.goals);
      }
    });

  const handleSubmit = () => {
    props.updateEntry({...props.newEntry, goals: goals});
    props.navigation.navigate('Step 4');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView style={styles.background}>
        <Text style={styles.question}>
          What goals am I working toward today?
        </Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="List at least 1 goal you are working toward today."
          onChangeText={text => setGoals(text)}
          value={goals}
        />
        <View>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </TouchableOpacity>
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
  button: {
    backgroundColor: '#FF8100',
    borderColor: '#FF8100',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});

export default Step3;
