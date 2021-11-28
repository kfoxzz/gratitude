import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/userSlice';

function Settings(props) {

  const dispatch = useDispatch();

    return (
      <ScrollView>
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
});

export default Settings;