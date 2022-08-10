import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import SocialSignButtons from '../../../components/SocialSignButtons/SocialSignButtons';
import {useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'
import {Auth} from 'aws-amplify'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SingUpScreen = () => {
  const { control, handleSubmit, watch} = useForm()

  const pwd = watch('password')
  const navigation = useNavigation()

  const onRegisterPress = async (data) => {
    const {username, password, email, name} = data
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username}
      })
      navigation.navigate('ConfirmEmail', {username})
    } catch (error) {
        Alert.alert('Oops', error.message)
    }
  }

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed')
  }

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed')
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Creat an Account</Text>

        <CustomInput
            name="name"
            control={control}
            placeholder="Name"
            rules={{
              required: 'Name is required',
              minLength: {
                values: 3,
                message: 'Name should be at least 3 characteres long'
              },
              maxLength: {
                value: 24,
                message: 'Name should be at max 24 characteres long'
              }
            }}
        />

        <CustomInput
            name="username"
            control={control}
            placeholder="Username"
            rules={{
              required: 'Username is required',
              minLength: {
                values: 3,
                message: 'Username should be at least 3 characteres long'
              },
              maxLength: {
                value: 24,
                message: 'Username should be at max 24 characteres long'
              }
            }}
        />

        <CustomInput
          placeholder="Email"
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}
          }} 
        />

        <CustomInput
          placeholder="Password"
          control={control}
          name="password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Passwor should be at least 8 characters long'
            }
          }}
        />

        <CustomInput
          placeholder="Repeat Password"
          control={control}
          name="password-repeat"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match'
          }}          
        />

        <CustomButton
          text='Register'
          onPress={handleSubmit(onRegisterPress)}
        />

        <SocialSignButtons/>

        <Text style={styles.text}>
          By registering, confirm that you accept your 
          <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
        </Text>

        <CustomButton
          text="Have an account? Sign In"
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
  text:{
    color: 'gray',
    marginVertical: 10
  },
  link: {
    color: '#FDB075'
  }
})

export default SingUpScreen;
