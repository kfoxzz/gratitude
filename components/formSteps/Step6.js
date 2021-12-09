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
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function Step6(props) {
  const [lookingForwardTo, setLookingForwardTo] = useState('');
  const userId = useSelector(state => state.user.user.uid);
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.newEntry.lookingForwardTo) {
      setLookingForwardTo(props.newEntry.lookingForwardTo);
    }
  }, []);

  const handleSubmit = () => {
    if (lookingForwardTo) {
      props.updateEntry({
        ...props.newEntry,
        lookingForwardTo: lookingForwardTo,
        date: new Date().toLocaleDateString('en-US'),
        id: uuidv4(),
        uid: userId
      });
      setError('');
      props.navigation.navigate('Submit Form');
    } else {
      setError('Required field.')
    }
  };

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.question}>What am I looking forward to today?</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="List at least one thing you are looking forward to today."
        onChangeText={text => setLookingForwardTo(text)}
        value={lookingForwardTo}
      />
      <Text style={{ color: 'red', paddingHorizontal: 20 }}>{error}</Text>
      <View>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </TouchableOpacity>
        <Button
          title="Back"
          color="#FF8100"
          onPress={() => props.navigation.navigate('Step 5')}
        />
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

export default Step6;
