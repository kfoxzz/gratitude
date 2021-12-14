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

function Step5(props) {

  const { colors } = useTheme();
  
  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      height: 500
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
    <>
      <Header
        backgroundColor={colors.background}
        containerStyle={{ borderBottomColor: colors.background }}
      />
      <ScrollView style={styles.background}>
        <View style={styles.backButton}>
          <Button
            title="Cancel"
            onPress={() => navigation.navigate('New Entry')}
            color="#FF8100"
          />
        </View>
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
          onPress={() => props.navigation.navigate('Step 4')}
        />
      </View>
    </>
  );
}

export default Step5;
