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

function Step1(props) {

  const [gratitudeList, setGratitudeList] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.newEntry.gratitudeList) {
      setGratitudeList(props.newEntry.gratitudeList)
    }
  });

  const handleSubmit = () => {
    if (gratitudeList) {
      props.updateEntry({...props.newEntry, gratitudeList: gratitudeList});
      setError('');
      props.navigation.navigate('Step 2')
    } else {
      setError('Required field.')
    }
  }

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.question}>I am grateful for...</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="List 10 things you are grateful for."
        onChangeText={text => setGratitudeList(text)}
        value={gratitudeList}
      />
      <Text style={{ color: 'red', paddingHorizontal: 20 }}>{error}</Text>
      <View>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </TouchableOpacity>
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

export default Step1;