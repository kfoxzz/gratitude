import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEntriesAsync } from '../redux/userSlice';

function PreviousEntries(props) {

  const dispatch = useDispatch();
  const entries = useSelector(state => state.user.entries);
  const uid = useSelector(state => state.user.user.uid);
  
  useEffect(() => {
      dispatch(fetchEntriesAsync(uid));
  }, []);

  const EntryItem = ({item, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text>{item.date}</Text>
      </TouchableOpacity>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <EntryItem
        item={item}
        onPress={() => props.navigation.navigate('My Entry', {entryId: item.id})}
      />
    )
  }

  return (
    <View style={{ backgroundColor: 'white' }}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderBottomColor: 'white'
  },
});;

export default PreviousEntries;
