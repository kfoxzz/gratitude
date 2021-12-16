import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/userSlice';
import { useTheme } from '@react-navigation/native';
import EditNameModal from './modals/EditNameModal';
import NameUpdatedModal from './modals/NameUpdatedModal';
import { useNavigation } from '@react-navigation/native';

function Settings(props) {

  const navigation = useNavigation();

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    logOut: {
      backgroundColor: '#FF8100',
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: '300',
      fontStyle: 'italic',
      color: 'darkgray',
      paddingBottom: 30,
    },
    subtitle: {
      fontSize: 18,
      paddingTop: 8,
      color: colors.text,
    },
    info: {
      color: 'darkgray',
      fontSize: 18,
    },
    editView: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
  });

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const [namelModalVisible, setNameModalVisible] = useState(false);
  const [nameUpdatedModal, setNameUpdatedModal] = useState(false);


    return (
      <ScrollView style={{ backgroundColor: colors.background }}>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>Account Details</Text>
          <Text style={styles.subtitle}>Name</Text>
          <View style={styles.editView}>
            <Text style={styles.info}>{user.name}</Text>
            <Button title="Edit" onPress={() => setNameModalVisible(true)} />
          </View>
          <Text style={styles.subtitle}>Email</Text>
          <View style={styles.editView}>
            <Text style={styles.info}>{user.email}</Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('ChangeEmail')}
            />
          </View>
          <Text style={styles.subtitle}>User ID</Text>
          <Text style={styles.info}>{user.uid}</Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <View style={styles.logOut}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
        <EditNameModal
          modalVisible={namelModalVisible}
          hideModal={setNameModalVisible}
          updatedNameModalVisible={nameUpdatedModal}
          setUpdatedNameModal={setNameUpdatedModal}
        />
        <NameUpdatedModal
          modalVisible={nameUpdatedModal}
          hideModal={setNameUpdatedModal}
        />
      </ScrollView>
    );
}

export default Settings;