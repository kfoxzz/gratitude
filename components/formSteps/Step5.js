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

function Step5(props) {

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
      margin: 10,
    },
    buttonText: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
    },
  });

  const [loveAboutPeople, setLoveAboutPeople] = useState('');
  const [helpOthers, setHelpOthers] = useState('');
  const [errorOne, setErrorOne] = useState('');
  const [errorTwo, setErrorTwo] = useState('');

  useEffect(() => {
    if (props.newEntry.loveAboutPeople) {
      setLoveAboutPeople(props.newEntry.loveAboutPeople);
    }
    if (props.newEntry.helpOthers) {
      setHelpOthers(props.newEntry.helpOthers);
    }
  }, []);

    const handleSubmit = () => {
      if (loveAboutPeople && helpOthers) {
        props.updateEntry({
          ...props.newEntry,
          loveAboutPeople: loveAboutPeople,
          helpOthers: helpOthers,
        });
        setErrorOne('');
        setErrorTwo('');
        props.navigation.navigate('Step 6');
      } else if (!loveAboutPeople && !helpOthers) {
        setErrorOne('Required field.');
        setErrorTwo('Required field.');
      } else if (!loveAboutPeople) {
        setErrorOne('Required field.');
        setErrorTwo('');
      } else if (!helpOthers) {
        setErrorOne('');
        setErrorTwo('Required field.');
      }
    };

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.question}>
        What do I love about the people in my life today?
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="List at least one thing you love about someone in your life."
        placeholderTextColor={colors.inputPlaceholder}
        onChangeText={text => setLoveAboutPeople(text)}
        value={loveAboutPeople}
      />
      <Text style={{ color: 'red', paddingHorizontal: 20 }}>{errorOne}</Text>
      <Text style={styles.question}>
        What can I do to help another person today?
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="List at least one way you can help someone today."
        placeholderTextColor={colors.inputPlaceholder}
        onChangeText={text => setHelpOthers(text)}
        value={helpOthers}
      />
      <Text style={{ color: 'red', paddingHorizontal: 20 }}>{errorTwo}</Text>
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

export default Step5;
