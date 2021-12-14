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
  Alert
} from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme, useNavigation } from '@react-navigation/native';

function SubmitForm(props) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      padding: 20,
      paddingTop: 0
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
    subtitle: {
      fontSize: 18,
      paddingVertical: 8,
      color: colors.text,
    },
    info: {
      color: colors.subtext,
      fontSize: 18,
      paddingBottom: 20,
    },
    backButton: {
      alignSelf: 'flex-start',
      paddingBottom: 5
    },
    title: {
      color: colors.text,
      paddingBottom: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold'
    }
  });

  const navigation = useNavigation();

  const { newEntry } = props;

  const handleSubmit = () => {
    props.submitEntry();
    props.clearForm();
    props.navigation.navigate('My Entries');
  };

  const handleCancel = () => {
    Alert.alert('Delete entry', 'Are you sure you want to cancel this entry?', [
      {
        text: 'No',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => navigation.navigate('New Entry') },
    ]);
  }

  return (
    <>
      <Header
        backgroundColor={colors.background}
        containerStyle={{ borderBottomColor: colors.background }}
      />
      <ScrollView style={styles.background}>
        <View style={styles.backButton}>
          <Button title="Cancel" onPress={handleCancel} color="#FF8100" />
        </View>
        <View>
          <Text style={styles.title}>New Entry</Text>
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

          <Text style={{ color: colors.text }}>
            Click Submit to submit your new entry, or Back to edit.
          </Text>
        </View>
        <View style={{ paddingBottom: 50 }}>
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
    </>
  );
}

export default SubmitForm;
