import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEntriesAsync } from '../redux/userSlice';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

function PreviousEntries(props) {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    item: {
      padding: 20,
      borderColor: colors.listBorder,
      borderWidth: 1,
      borderBottomColor: colors.background,
      backgroundColor: colors.background,
    },
  });

  const dispatch = useDispatch();
  const entries = useSelector(state => state.user.entries);
  const uid = useSelector(state => state.user.user.uid);
  
  useEffect(() => {
      dispatch(fetchEntriesAsync(uid));
  }, []);

  const EntryItem = ({item, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={{color: colors.text}}>{item.date}</Text>
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
    <View style={{ backgroundColor: colors.background }}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default PreviousEntries;
