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

function Step5(props) {
  const [loveAboutPeople, setLoveAboutPeople] = useState('');
  const [helpOthers, setHelpOthers] = useState('');

  useEffect(() => {
    if (props.newEntry.loveAboutPeople) {
      setLoveAboutPeople(props.newEntry.loveAboutPeople);
    }
    if (props.newEntry.helpOthers) {
      setHelpOthers(props.newEntry.helpOthers);
    }
  });

  const handleSubmit = () => {
    props.updateEntry({ ...props.newEntry, loveAboutPeople: loveAboutPeople, helpOthers: helpOthers});
    props.navigation.navigate('Step 6');
  }

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.question}>
        What do I love about the people in my life today?
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="List at least one thing you love about someone in your life."
        onChangeText={text => setLoveAboutPeople(text)}
        value={loveAboutPeople}
      />
      <Text style={styles.question}>
        What can I do to help another person today?
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="List at least one way you can help someone today."
        onChangeText={text => setHelpOthers(text)}
        value={helpOthers}
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
          onPress={() => props.navigation.navigate('Step 4')}
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

export default Step5;
