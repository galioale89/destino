import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from '../routes';

import { AuthProvider } from '../context/auth'

const Navigation = () => {

    return (
        <NavigationContainer>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </NavigationContainer>
    )
};

export default Navigation;