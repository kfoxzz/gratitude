import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

function ConfirmEmailChange(props) {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: '300',
      fontStyle: 'italic',
      color: 'darkgray',
      paddingBottom: 30,
    },
    editView: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    viewContainer: {
      padding: 20,
    },
    confirmButton: {
      backgroundColor: '#FF8100',
      borderRadius: 10,
      padding: 10,
      margin: 10,
      marginHorizontal: 18,
    },
    backButton: {
      alignSelf: 'flex-start',
      width: 80,
    },
    textInput: {
      borderWidth: 1,
      padding: 10,
      marginTop: 10,
      borderColor: colors.textInputBorder,
      borderRadius: 10,
      fontSize: 20,
      backgroundColor: colors.textInputColor,
      color: colors.text,
    },
    text: {
      color: colors.text,
      paddingBottom: 20,
      fontSize: 18,
    },
  });

  const handleConfirm = () => {
    console.log('pressed change email');
  };

  return (
    <>
      <Header
        backgroundColor={colors.background}
        containerStyle={{ borderBottomColor: colors.background }}>
        <View style={styles.backButton}>
          <Button
            title="Close"
            onPress={() => props.navigation.navigate('Settings')}
            color="#FF8100"
          />
        </View>
      </Header>
      <StatusBar barStyle={colors.statusBar} translucent={true} />
      <View style={styles.viewContainer}>
        <Text style={styles.text}>Your email address has been successfully changed. You will receive a confirmation email shortly.</Text>
      </View>
    </>
  );
}

export default ConfirmEmailChange;
