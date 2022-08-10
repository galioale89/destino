import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'
import {Auth} from 'aws-amplify'
import { useRoute } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
  const route = useRoute()
  const {control, handleSubmit, watch} = useForm({defaultValues: {usernamen: route?.params?.username}})

  const username = watch('username')

  const navigation = useNavigation()

  const onConfirmPress = async data => {
    try {
      await Auth.confirmSignUp(data.username, data.code)
      navigation.navigate('SignIn')
    } catch (error) {
      Alert.alert('Oops', error.message)
    }
  }

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username)
      Alert.alert('Success', 'Code was resend to your e-mail.')
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
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          placeholder="Username"
          name="username"
          control={control} 
          rules={{
            require: 'Username is required.'
          }}
        />

        <CustomInput
          placeholder="Enter your confirmation code"
          name="code"
          control={control} 
          rules={{
            require: 'Confirmation code is required.'
          }}
        />

        <CustomButton
          text='Confirm'
          onPress={handleSubmit(onConfirmPress)}
        />

        <CustomButton
          text='Resend Code'
          onPress={onResendPress}
          type='SECONDARY'
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

export default ConfirmEmailScreen;
