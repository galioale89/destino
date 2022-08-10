import React, { useState, useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../../../../assets/images/destino_logo.png'
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../../components/SocialSignButtons/SocialSignButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../context/auth'

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation()

  const { onSignInPressed, loading } = useContext(AuthContext)
  console.log(loading)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgorPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />

          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{ required: 'Username is required' }}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password should be minimum 3 characters long',
              },
            }}
          />

          <CustomButton
            text={loading ? 'Loading...' : 'Sign In'}
            onPress={handleSubmit(onSignInPressed)}
          />

          <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />

          <SocialSignInButtons />

          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  }
});

export default SignInScreen;
