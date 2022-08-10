import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const ForgotPasswordSccreen = () => {
  const {control, handleSubmit} = useForm()
  const navigation = useNavigation()

  const onSendPressed = async data => {
    try {
        await Auth.forgotPassword(data.username)
        navigation.navigate('NewPassword')
    } catch (error) {
        Alert.alert('Oops', error.message)
    }
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Username"
          name="code"
          control={control} 
          rules={{
            required: "Username is required."
          }}
        />

        <CustomButton
          text='Send'
          onPress={handleSubmit(onSendPressed)}
        />

        <CustomButton
          text='Back to Sign In'
          onPress={onSignInPress}
          type='TERTIARY'
        />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051c60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10
  },
  link: {
    color: '#FDB075'
  } 
})

export default ForgotPasswordSccreen;
