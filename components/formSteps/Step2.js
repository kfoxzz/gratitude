import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';

function Step2(props) {
    const [yesButton, setYesButton] = useState(styles.buttonNotSelected);
    const [noButton, setNoButton] = useState(styles.buttonNotSelected);
    const [yesText, setYesText] = useState(styles.textNotSelected);
    const [noText, setNoText] = useState(styles.textNotSelected);
    const [value, setValue] = useState(false);

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
      props.updateEntry({
        ...props.newEntry,
        meditation: value,
      });
      props.navigation.navigate('Step 3');
    }

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.question}>Have I taken time to meditate today?</Text>
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
      <View style={styles.navigationButtons}>
        <Button
          title="Next"
          color="#FF8100"
          onPress={handleSubmit}
        />
        <Button
          title="Back"
          color="#FF8100"
          onPress={() => props.navigation.navigate('Step 1')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1
  },
  question: {
    fontSize: 32,
    fontWeight: '600',
    padding: 24,
  },
  buttonSelected: {
    backgroundColor: '#FF8100',
    borderColor: '#FF8100',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 200,
  },
  buttonNotSelected: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF8100',
    padding: 10,
    margin: 10,
    width: 200,
  },
  textSelected: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  textNotSelected: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FF8100',
  },
  navigationButtons: {
    flex: 1,
    justifyContent: 'flex-end'
  },
});

export default Step2;