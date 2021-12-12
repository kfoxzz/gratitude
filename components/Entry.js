import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert, SafeAreaView, Share } from 'react-native';
import { SpeedDial } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEntryAsync, fetchEntriesAsync } from '../redux/userSlice';
import { calculateConsecutiveEntries } from '../redux/userSlice';
import { useTheme } from '@react-navigation/native';


function Entry(props) {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.background,
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
      color: colors.text
    },
    info: {
      color: colors.subtext,
      fontSize: 18,
      paddingBottom: 20,
    },
  });

  const dispatch = useDispatch();

  const entries = useSelector(state => state.user.entries);
  const uid = useSelector(state => state.user.user.uid);
  const [ open, setOpen ] = useState(false);

  const { entryId } = props.route.params;
  const entry = entries.filter(entry => entryId === entry.id)[0];

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out my entry for today on the Gratitude app!

        I am grateful for: ${entry.gratitudeList}.
        Have I taken time to meditate today? ${entry.meditation ? 'Yes' : 'No'}
        What goals am I working toward today? ${entry.goals}
        I love myself because: ${entry.selflove}
        What can I do to show self-love today? ${entry.selfloveAction}
        What do I love about the people in my life today? ${entry.loveAboutPeople}
        What can I do to help another person today? ${entry.helpOthers}
        What am I looking forward to today? ${entry.lookingForwardTo}
        `,
      });
    } catch (error) {
      alert(error.message);
    }
  };


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

  const deleteEntry = async () => {
    props.navigation.navigate('My Entries');
    await dispatch(deleteEntryAsync(entryId, uid));
    await dispatch(fetchEntriesAsync(uid));
    const dateArray = entries.map(entry => entry.date);
    await dispatch(calculateConsecutiveEntries(dateArray));
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'My Entries' }],
    });
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.background }} />
      <ScrollView style={styles.background}>
        <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}>
          <Button
            title="Back"
            color="#FF8100"
            onPress={() => props.navigation.navigate('My Entries')}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text style={styles.subtitle}>I am grateful for...</Text>
          <Text style={styles.info}>{entry.gratitudeList}</Text>
          <Text style={styles.subtitle}>
            Have I taken time to meditate today?
          </Text>
          <Text style={styles.info}>{entry.meditation ? 'Yes' : 'No'}</Text>
          <Text style={styles.subtitle}>
            What goals am I working toward today?
          </Text>
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
          <Text style={styles.subtitle}>
            What am I looking forward to today?
          </Text>
          <Text style={styles.info}>{entry.lookingForwardTo}</Text>
          <SpeedDial
            isOpen={open}
            icon={{ name: 'add', color: '#fff' }}
            openIcon={{ name: 'close', color: '#fff' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            overlayColor="transparent"
            iconContainerStyle={{ backgroundColor: '#FF8100' }}
            style={{ paddingRight: 10 }}>
            <SpeedDial.Action
              icon={{ name: 'delete', color: '#fff' }}
              onPress={handleDelete}
              iconContainerStyle={{ backgroundColor: '#FF8100' }}
            />
            <SpeedDial.Action
              icon={{ name: 'share', color: '#fff' }}
              onPress={onShare}
              iconContainerStyle={{ backgroundColor: '#FF8100' }}
            />
          </SpeedDial>
        </View>
      </ScrollView>
    </>
  );
}

export default Entry;
