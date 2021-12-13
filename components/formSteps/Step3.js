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
import { useTheme } from '@react-navigation/native';


function Step3(props) {

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
      color: colors.text,
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
      marginTop: 10,
      marginHorizontal: 20,
    },
    buttonText: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
    },
  });

    const [goals, setGoals] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      if (props.newEntry.goals) {
        setGoals(props.newEntry.goals);
      }
    }, []);

  const handleSubmit = () => {
    if (goals) {
      props.updateEntry({...props.newEntry, goals: goals});
      setError('');
      props.navigation.navigate('Step 4');
    } else {
      setError('Required field.');
    }
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
          placeholderTextColor={colors.inputPlaceholder}
          onChangeText={text => setGoals(text)}
          value={goals}
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
            onPress={() => props.navigation.navigate('Step 2')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Step3;
