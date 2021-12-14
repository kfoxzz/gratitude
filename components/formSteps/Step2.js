import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme, useNavigation } from '@react-navigation/native';

function Step2(props) {

    const { colors } = useTheme();

    const styles = StyleSheet.create({
      background: {
        backgroundColor: colors.background,
        height: '100%',
        flex: 1,
      },
      question: {
        fontSize: 32,
        fontWeight: '600',
        padding: 24,
        color: colors.text,
      },
      buttonSelected: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF8100',
        padding: 10,
        margin: 10,
        width: 100,
      },
      buttonNotSelected: {
        padding: 10,
        margin: 10,
        width: 100,
      },
      textSelected: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FF8100',
      },
      textNotSelected: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FF8100',
      },
      navigationButtons: {
        flex: 1,
        justifyContent: 'flex-end',
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

    const [yesButton, setYesButton] = useState(styles.buttonNotSelected);
    const [noButton, setNoButton] = useState(styles.buttonNotSelected);
    const [yesText, setYesText] = useState(styles.textNotSelected);
    const [noText, setNoText] = useState(styles.textNotSelected);
    const [value, setValue] = useState('none');
    const [error, setError] = useState('');

    const setSelectedState = (selected, setButtonState, setTextState) => {
        if (selected) {
            setButtonState(styles.buttonSelected);
            setTextState(styles.textSelected);
        } else {
            setButtonState(styles.buttonNotSelected);
            setTextState(styles.textNotSelected);
        }
    }

    const handleYes = () => {
        setSelectedState(true, setYesButton, setYesText);
        setSelectedState(false, setNoButton, setNoText);
        setValue(true);
    };

    const handleNo = () => {
        setSelectedState(true, setNoButton, setNoText);
        setSelectedState(false, setYesButton, setYesText);
        setValue(false);
    };

    const handleSubmit = () => {
      if (value == 'none') {
        setError('Required field.');
      } else {
        props.updateEntry({
          ...props.newEntry,
          meditation: value,
        });
        props.navigation.navigate('Step 3');
        setError('');
      }
    }

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
          Have I taken time to meditate today?
        </Text>
        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableOpacity
            onPress={() => handleYes()}
            style={{ alignItems: 'center' }}>
            <View style={yesButton}>
              <Text style={yesText}>Yes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNo()}
            style={{ alignItems: 'center' }}>
            <View style={noButton}>
              <Text style={noText}>No</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'red', paddingHorizontal: 20 }}>{error}</Text>
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </TouchableOpacity>
          <Button
            title="Back"
            color="#FF8100"
            onPress={() => props.navigation.navigate('Step 1')}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
  },
  question: {
    fontSize: 32,
    fontWeight: '600',
    padding: 24,
  },
  buttonSelected: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF8100',
    padding: 10,
    margin: 10,
    width: 100,
  },
  buttonNotSelected: {
    padding: 10,
    margin: 10,
    width: 100,
  },
  textSelected: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FF8100',
  },
  textNotSelected: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FF8100',
  },
  navigationButtons: {
    flex: 1,
    justifyContent: 'flex-end',
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

export default Step2;