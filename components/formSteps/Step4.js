import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

function Step4(props) {
  const [selflove, setSelflove] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = () => {
    props.updateEntry({...props.newEntry, selflove: selflove, selfloveAction: action});
    props.navigation.navigate('Step 5');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
          <ScrollView>
            <Text style={styles.question}>I love myself because...</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="List at least 3 things you love about yourself."
              onChangeText={text => setSelflove(text)}
              value={selflove}
            />
            <Text style={styles.question}>
              What can I do to show self-love today?
            </Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="How can I love myself?"
              onChangeText={text => setAction(text)}
              value={action}
            />
            <View>
              <Button
                title="Next"
                color="#FF8100"
                onPress={handleSubmit}
              />
              <Button
                title="Back"
                color="#FF8100"
                onPress={() => props.navigation.navigate('Step 3')}
              />
            </View>
          </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

export default Step4;
