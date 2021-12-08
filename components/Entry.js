import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEntryAsync } from '../redux/userSlice';

function Entry(props) {
  const dispatch = useDispatch();

  const entries = useSelector(state => state.user.entries);
  const uid = useSelector(state => state.user.user.uid);

  const { entryId } = props.route.params;
  const entry = entries.filter(entry => entryId === entry.id)[0];

  const handleDelete = () => {
    Alert.alert(
      'Delete entry',
      'Are you sure you want to permanently delete this entry?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => deleteEntry() },
      ]
    );
  }

  const deleteEntry = () => {
    dispatch(deleteEntryAsync(entryId, uid));
    console.log('Entry Deleted');
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'My Entries' }],
    });
  }

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.subtitle}>I am grateful for...</Text>
      <Text style={styles.info}>{entry.gratitudeList}</Text>
      <Text style={styles.subtitle}>Have I taken time to meditate today?</Text>
      <Text style={styles.info}>{entry.meditation ? 'Yes' : 'No'}</Text>
      <Text style={styles.subtitle}>What goals am I working toward today?</Text>
      <Text style={styles.info}>{entry.goals}</Text>
      <Text style={styles.subtitle}>I love myself because...</Text>
      <Text style={styles.info}>{entry.selflove}</Text>
      <Text style={styles.subtitle}>
        What can I do to show self-love today?
      </Text>
      <Text style={styles.info}>{entry.selfloveAction}</Text>
      <Text style={styles.subtitle}>
        What do I love about the people in my life today?
      </Text>
      <Text style={styles.info}>{entry.loveAboutPeople}</Text>
      <Text style={styles.subtitle}>
        What can I do to help another person today?
      </Text>
      <Text style={styles.info}>{entry.helpOthers}</Text>
      <Text style={styles.subtitle}>What am I looking forward to today?</Text>
      <Text style={styles.info}>{entry.lookingForwardTo}</Text>
      <View>
        <Button
          title="Back"
          onPress={() => props.navigation.navigate('Entries')}
        />
        <Button
          title="Delete Entry"
          onPress={handleDelete}
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
  title: {
    fontSize: 24,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'darkgray',
    paddingBottom: 30,
    textAlign: 'center',
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

export default Entry;
