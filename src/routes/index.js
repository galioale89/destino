import React, { useContext } from 'react'
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native'
import Logo from '../../assets/images/destino_logo.png'

import { AuthContext } from '../context/auth'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes = () => {
    const { signed, user } = useContext(AuthContext)

    if (user === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={Logo}
                    style={styles.logo}
                    resizeMode='contain'
                />
                <ActivityIndicator />
            </View>
        );
    }

    return (
        signed ? <AuthRoutes /> : <AppRoutes />
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    }
})

export default Routes