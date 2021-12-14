import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FAB } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEntriesAsync } from '../redux/userSlice';
import { useTheme, useNavigation } from '@react-navigation/native';

function PreviousEntries(props) {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    item: {
      padding: 20,
      borderColor: colors.listBorder,
      borderWidth: 1,
      borderTopColor: colors.background,
      backgroundColor: colors.background,
    },
  });

  const navigation = useNavigation();

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
        onPress={() => navigation.navigate('My Entry', {entryId: item.id})}
      />
    )
  }

  return (
    <View style={{ backgroundColor: colors.background }}>
      <FAB
        title="Submit a New Entry"
        color={colors.shareButton}
        containerStyle={{ marginBottom: 10 }}
        titleStyle={{
          color: colors.shareButtonText,
          fontWeight: 'bold',
        }}
        onPress={() => navigation.navigate('NewEntryStack')}
      />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default PreviousEntries;
