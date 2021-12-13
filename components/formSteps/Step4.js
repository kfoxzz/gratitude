import React, { useState, useEffect } from 'react';
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
  TouchableOpacity
} from 'react-native';
import { useTheme } from '@react-navigation/native';

function Step4(props) {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      height: 200,
    },
    question: {
      fontSize: 32,
      fontWeight: '600',
      padding: 24,
      color: colors.text
    },
    input: {
      margin: 12,
      marginHorizontal: 20,
      borderWidth: 1,
      padding: 10,
      paddingTop: 11,
      borderRadius: 6,
      borderColor: colors.textInputBorder,
      fontSize: 18,
      backgroundColor: colors.textInputColor,
      color: colors.text,
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

  const [selflove, setSelflove] = useState('');
  const [action, setAction] = useState('');
  const [errorOne, setErrorOne] = useState('');
  const [errorTwo, setErrorTwo] = useState('');

  useEffect(() => {
    if (props.newEntry.selflove) {
      setSelflove(props.newEntry.selflove);
    }
    if (props.newEntry.selfloveAction) {
      setAction(props.newEntry.selfloveAction);
    }
  }, []);

  const handleSubmit = () => {
    if (selflove && action) {
      props.updateEntry({...props.newEntry, selflove: selflove, selfloveAction: action});
      setErrorOne('');
      setErrorTwo('');
      props.navigation.navigate('Step 5');
    } else if (!selflove && !action) {
      setErrorOne('Required field.');
      setErrorTwo('Required field.');
    } else if (!selflove) {
      setErrorOne('Required field.');
      setErrorTwo('');
    } else if (!action) {
      setErrorOne('');
      setErrorTwo('Required field.');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: colors.background,
        }}>
        <ScrollView>
          <Text style={styles.question}>I love myself because...</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="List at least 3 things you love about yourself."
            placeholderTextColor={colors.inputPlaceholder}
            onChangeText={text => setSelflove(text)}
            value={selflove}
          />
          <Text style={{ color: 'red', paddingHorizontal: 20 }}>
            {errorOne}
          </Text>
          <Text style={styles.question}>
            What can I do to show self-love today?
          </Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="How can I love myself?"
            placeholderTextColor={colors.inputPlaceholder}
            onChangeText={text => setAction(text)}
            value={action}
          />
          <Text style={{ color: 'red', paddingHorizontal: 20 }}>
            {errorTwo}
          </Text>
          <View>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </View>
            </TouchableOpacity>
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

export default Step4;
