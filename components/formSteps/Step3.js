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
import { Header } from 'react-native-elements';
import { useTheme, useNavigation } from '@react-navigation/native';

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
    backButton: {
      alignSelf: 'flex-start',
      paddingLeft: 15,
    },
    navigationButtons: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 50,
    },
  });

    const navigation = useNavigation();

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
    <>
      <Header
        backgroundColor={colors.background}
        containerStyle={{ borderBottomColor: colors.background }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <ScrollView style={styles.background}>
          <View style={styles.backButton}>
            <Button
              title="Cancel"
              onPress={() => navigation.navigate('New Entry')}
              color="#FF8100"
            />
          </View>
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
        </ScrollView>
        <View style={styles.navigationButtons}>
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
      </KeyboardAvoidingView>
    </>
  );
}

export default Step3;
