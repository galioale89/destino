import React from 'react'
import CustomButton from '../CustomButton'
import { View, Text } from 'react-native'

const SocialSign = () => {

    const onSignInFacebook = () => {
        console.warn('onSignInfacebook')
    }
  
    const onSignInGoogle = () => {
        console.warn('onSignInGoogle')
    }
  
    const onSignInApple = () => {
        console.warn('onSignInApple')
    }
    return (
        <>
            <CustomButton
                text='Sign In with Facebook'
                onPress={onSignInFacebook}
                type='TERTIARY'
                bgColor='#E7EAF4'
                fgColor='#4765A9'
            />

            <CustomButton
                text='Sign In with Google'
                onPress={onSignInGoogle}
                type='TERTIARY'
                bgColor='#FAE9AE'
                fgColor='#DD4D44'
            />

            <CustomButton
                text='Sign In with Apple'
                onPress={onSignInApple}
                type='TERTIARY'
                bgColor='#e3e3e3'
                fgColor='#363636'
            />
        </>
    )
}

export default SocialSign 