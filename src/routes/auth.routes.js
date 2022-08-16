import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PlaceInput from '../components/CustomPlaceInput/CustomPlaceInput';
import { AuthContext } from '../context/auth';

import Vehicle from '../screens/Vehicle'
import Map from '../screens/Map'
import Route from '../screens/Route';
import Account from '../screens/Account'

const Tab = createMaterialBottomTabNavigator();

const AuthRoutes = () => {

    const { locationDestination, search} = useContext(AuthContext)

    return (
        <>
            {search &&
                <View style={[styles.search, { flexDirection: 'row' }]}>
                    <PlaceInput
                        placeholder='Search Destination'
                        onPress={locationDestination}
                    />
                    <Icon name='map-search' color='rgba(100,100,100,0.8)' size={26} style={{ right: 50, marginTop: 10 }} />
                </View>
            }

            <Tab.Navigator
                labeled={false}
                initialRouteName='Map'
                activeColor="#ffff"
                barStyle={{ backgroundColor: '#000' }}
            >
                <Tab.Screen
                    name="Map"
                    component={Map}
                    options={{
                        tabBarLabel: 'Map',
                        tabBarIcon: ({ color }) => (
                            <Icon name="map-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Vehicle"
                    component={Vehicle}
                    options={{
                        tabBarLabel: 'Vehicle',
                        tabBarIcon: ({ color }) => (
                            <Icon name="car" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name='Route'
                    component={Route}
                    options={{
                        tabBarLabel: 'Route',
                        tabBarIcon: ({ color }) => (
                            <Icon name='sign-direction' color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Account'
                    component={Account}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color }) => (
                            <Icon name='card-account-details' color={color} size={26} />
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    search: {
        position: 'absolute',
        width: '90%',
        marginHorizontal: 20,
        top: 80,
        zIndex: 1,
    }
})

export default AuthRoutes;
