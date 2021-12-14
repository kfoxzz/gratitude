import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { updateEmailAsync } from '../../redux/userSlice';

function EditEmailModal(props) {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      marginHorizontal: 20,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingHorizontal: 35,
      paddingBottom: 10,
      paddingTop: 35,
      alignItems: 'center',
      shadowColor: colors.text,
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
      color: colors.text,
      paddingTop: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.textInputBorder,
      fontSize: 16,
      padding: 5,
      borderRadius: 5,
      width: 200,
      color: colors.text,
    },
    cancelButton: {
      backgroundColor: colors.inputPlaceholder,
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
    button: {
      backgroundColor: '#FF8100',
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
    buttonView: {
      flexDirection: 'row',
      paddingTop: 20,
      paddingBottom: 10
    },
  });

  const handleConfirm = async () => {
    if (email && email === confirmEmail) {
      setError('');
      await dispatch(updateEmailAsync(email));
      props.hideModal(!props.modalVisible);
      props.setUpdatedEmailModal(!props.updatedEmailModalVisible);
    } else if (!email) {
      setError('Please enter your email')
    } else if (email != confirmEmail) {
      setError('Emails do not match')
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.hideModal(!props.modalVisible)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Edit Email</Text>
          <Text style={styles.text}>New Email:</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
            style={styles.input}
            placeholderTextColor={colors.inputPlaceholder}
          />
          <Text style={styles.text}>Confirm New Email:</Text>
          <TextInput
            placeholder="Confirm email"
            value={confirmEmail}
            onChangeText={value => setConfirmEmail(value)}
            style={styles.input}
            placeholderTextColor={colors.inputPlaceholder}
          />
          <Text style={{ color: 'red', paddingTop: 10 }}>{error}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => props.hideModal(!props.modalVisible)}>
              <View style={styles.cancelButton}>
                <Text
                  style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm}>
              <View style={styles.button}>
                <Text
                  style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
                  Confirm
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default EditEmailModal;
