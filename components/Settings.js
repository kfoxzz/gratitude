import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/userSlice';

function Settings(props) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>Account Details</Text>
          <Text style={styles.subtitle}>Name</Text>
          <Text style={styles.info}>{user.name}</Text>
          <Text style={styles.subtitle}>User ID</Text>
          <Text style={styles.info}>{user.uid}</Text>
          <Text style={styles.subtitle}>Email</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <View style={styles.logOut}>
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  logOut: {
    backgroundColor: '#FF8100',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  // heading: {
  //   paddingTop: 24,
  //   paddingHorizontal: 24,
  //   fontSize: 36,
  //   color: '#FF8100',
  //   fontWeight: '300',
  // },
  title: {
    fontSize: 24,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'darkgray',
    paddingBottom: 30
  },
  subtitle: {
    fontSize: 18,
    paddingVertical: 8
  },
  info: {
    color: 'darkgray',
    fontSize: 18,
    paddingBottom: 10
  }
});

export default Settings;