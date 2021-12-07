import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';

function Entry(props) {
  const entries = useSelector(state => state.user.entries);
  const { entryId } = props.route.params;
  const entry = entries.filter(entry => entryId === entry.id)[0];

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
