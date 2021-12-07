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

function Step1(props) {

  const [gratitudeList, setGratitudeList] = useState('');

  const handleSubmit = () => {
    props.updateEntry({...props.newEntry, gratitudeList: gratitudeList});
    props.navigation.navigate('Step 2')
  }

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.question}>I am grateful for...</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="List 10 things you are grateful for."
        onChangeText={(text) => setGratitudeList(text)}
        value={gratitudeList}
      />
      <View>
        <Button
          title="Next"
          color="#FF8100"
          onPress={handleSubmit}
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
});

export default Step1;