import React from 'react';
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

function SubmitForm(props) {

    const { newEntry } = props;

      const handleSubmit = () => {
        props.submitEntry();
        props.clearForm();
        props.navigation.reset({
          index: 0,
          routes: [{name: 'My Entries'}]
        });
      };

    return (
      <ScrollView style={styles.background}>
        <View>
          <Text style={styles.subtitle}>I am grateful for...</Text>
          <Text style={styles.info}>{newEntry.gratitudeList}</Text>
          <Text style={styles.subtitle}>
            Have I taken time to meditate today?
          </Text>
          <Text style={styles.info}>{newEntry.meditation ? 'Yes' : 'No'}</Text>
          <Text style={styles.subtitle}>
            What goals am I working toward today?
          </Text>
          <Text style={styles.info}>{newEntry.goals}</Text>
          <Text style={styles.subtitle}>I love myself because...</Text>
          <Text style={styles.info}>{newEntry.selflove}</Text>
          <Text style={styles.subtitle}>
            What can I do to show self-love today?
          </Text>
          <Text style={styles.info}>{newEntry.selfloveAction}</Text>
          <Text style={styles.subtitle}>
            What do I love about the people in my life today?
          </Text>
          <Text style={styles.info}>{newEntry.loveAboutPeople}</Text>
          <Text style={styles.subtitle}>
            What can I do to help another person today?
          </Text>
          <Text style={styles.info}>{newEntry.helpOthers}</Text>
          <Text style={styles.subtitle}>
            What am I looking forward to today?
          </Text>
          <Text style={styles.info}>{newEntry.lookingForwardTo}</Text>

          <Text>Click Submit to submit your new entry, or Back to edit.</Text>
        </View>
        <View style={{paddingBottom: 50}}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
          <Button
            title="Back"
            color="#FF8100"
            onPress={() => props.navigation.navigate('Step 6')}
          />
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    padding: 20,
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
  title: {
    fontSize: 24,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'darkgray',
    paddingBottom: 30,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    paddingVertical: 8,
  },
  info: {
    color: 'darkgray',
    fontSize: 18,
    paddingBottom: 20,
  },
});

export default SubmitForm;