import React from 'react';
import { ScrollView, Text, View, StatusBar, StyleSheet } from 'react-native';
import { FAB } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

function NewEntry() {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    buttonView: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    viewContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    subtitle: {
      textAlign: 'center',
      color: colors.subtext,
      fontSize: 20,
      paddingBottom: 20,
      paddingHorizontal: 30
    },
  });

  return (
    <>
      <StatusBar barStyle={colors.statusBar} translucent={true} />
      <ScrollView contentContainerStyle={styles.viewContainer}>
        <View style={styles.buttonView}>
          <Text style={styles.subtitle}>Have you logged your gratitude today?</Text>
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
        </View>
      </ScrollView>
    </>
  );
}

export default NewEntry;