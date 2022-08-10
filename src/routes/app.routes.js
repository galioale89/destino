import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignIn from '../screens/Login/SignInScreen'
import SignUp from '../screens/Login/SignUpScreen'
import ForgorPassword from '../screens/Login/ForgotPasswordSccreen/'
import ConfirmEmail from '../screens/Login/ConfirmEmailScreen'
import NewPassword from '../screens/Login/NewPasswordScreen'

const AppStack = createNativeStackNavigator()

const AppRoutes = () => {    

    return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name='SignIn' component={SignIn} />
        <AppStack.Screen name='SignUp' component={SignUp} />
        <AppStack.Screen name='ForgorPassword' component={ForgorPassword} />
        <AppStack.Screen name='ConfirmEmail' component={ConfirmEmail} />
        <AppStack.Screen name='NewPassword' component={NewPassword} />
    </AppStack.Navigator>
    )
}

export default AppRoutes