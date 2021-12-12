import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';


function About(props) {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    subtitle: {
      fontSize: 18,
      paddingVertical: 8,
      color: colors.text
    },
  });

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.subtitle}>
          Icons made by Freepik from www.flaticon.com.
        </Text>
        <Text style={styles.subtitle}>Copyright &copy; 2021</Text>
      </View>
    </ScrollView>
  );
}

export default About;
