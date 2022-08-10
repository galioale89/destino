import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useForm} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {Auth} from 'aws-amplify'

const NewPasswordScreen = () => {
  const {control, handleSubmit} = useForm()

  const navigation = useNavigation()

  const onSubmitPressed = async data=> {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password)
      navigation.navigate('SignIn')
    } catch (error) {
      alert.alert('Oops', error.message)
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
          name="username"
          control={control} 
          rule={{
            required: "Username is required."
          }}
          />

        <CustomInput
          placeholder="Code"
          name="code"
          control={control} 
          rule={{
            required: "Code is required."
          }}
          />

        <CustomInput
          placeholder="Enter your new password"
          name="password"
          control={control} 
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long.'
            }
          }}
          />

        <CustomButton
          text='Submit'
          onPress={handleSubmit(onSubmitPressed)}
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

export default NewPasswordScreen;
