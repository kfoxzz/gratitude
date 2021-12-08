import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

function About(props) {

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.subtitle}>
          Icons made by Freepik from www.flaticon.com.
        </Text>
        <Text style={styles.subtitle}>Copyright &copy; 2021</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'darkgray',
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    paddingVertical: 8,
  },
  info: {
    color: 'darkgray',
    fontSize: 18,
    paddingBottom: 10,
  },
});

export default About;
