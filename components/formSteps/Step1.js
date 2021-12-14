import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Step1(props) {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    background: {
      height: 200,
      backgroundColor: colors.background,
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
  });

  const navigation = useNavigation();

  const [gratitudeList, setGratitudeList] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.newEntry.gratitudeList) {
      setGratitudeList(props.newEntry.gratitudeList)
    }
  }, []);

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
    <>
      <Header
        backgroundColor={colors.background}
        containerStyle={{ borderBottomColor: colors.background }}
      />
      <ScrollView
        style={(styles.background)}>
        <View style={styles.backButton}>
          <Button
            title="Cancel"
            onPress={() => navigation.navigate('New Entry')}
            color="#FF8100"
          />
        </View>
        <Text
          style={{
            color: colors.text,
            fontSize: 32,
            fontWeight: '600',
            padding: 24,
          }}>
          I am grateful for...
        </Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="List 10 things you are grateful for."
          placeholderTextColor={colors.inputPlaceholder}
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
    </>
  );
}

const styles = StyleSheet.create({
  background: {
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
    borderColor: '#383838',
    fontSize: 18,
    backgroundColor: '#383838',
    color: 'white'
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