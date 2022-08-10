import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';


const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {}
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {}
        ]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 40
  },
  container_PRIMARY: {
    backgroundColor: '#406aac',
  },
  container_TERTIARY: {},
  container_REGISTER: {
    backgroundColor: '#406aac'
  },
  container_SECONDARY: {
    borderColor: '#406aac',
    borderWidth: 2
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  },
  text_TERTIARY: {
    color: 'gray'
  },
  text_SECONDARY: {
    color: '#406aac',
  }
})

export default CustomButton;