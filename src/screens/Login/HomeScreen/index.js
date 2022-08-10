import React from "react";
import {View, Text} from 'react-native'
import {Auth} from 'aws-amplify'

const SignOut = () => {
 Auth.signOut()
}

const Home = () => {
    return (
        <View style={{flex: 1}}>
            <Text style={{fontSize: 24, alignSelf: 'center'}}>Home, sweet Home!</Text>
            <Text
                onPress={SignOut}
                style={{
                    width:'100%',
                    textAlign: 'center',
                    color: 'red',
                    marginTop: 'auto',
                    marginVertical: 20,
                    fontSize: 20
                }} >
                    Sign Out
            </Text>
        </View>
    )
}
export default Home