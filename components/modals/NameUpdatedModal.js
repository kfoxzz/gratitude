import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';

function NameUpdatedModal(props) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 22,
      paddingBottom: 10,
      color: colors.text,
    },
    text: {
      fontSize: 16,
      paddingVertical: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.textInputBorder,
      fontSize: 16,
      padding: 5,
      borderRadius: 5,
      width: 200,
    },
    button: {
      backgroundColor: '#FF8100',
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.hideModal(!props.modalVisible)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Done!</Text>
          <Text style={styles.text}>
            Your name has been updated.
          </Text>
          <TouchableOpacity
            onPress={() => props.hideModal(!props.modalVisible)}>
            <View style={styles.button}>
              <Text
                style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
                Close
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default NameUpdatedModal;
