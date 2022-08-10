import React, { createContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Auth, Hub } from 'aws-amplify';
import { TabActions } from '@react-navigation/native';

export const AuthContext = createContext();

import * as Location from 'expo-location';
import { Alert } from 'react-native';


export const AuthProvider = ({ children }) => {

    const JumpAction = TabActions.jumpTo('Map', {user: 'Route'});
    const JumpAccount = TabActions.jumpTo('Account', {user: 'Route'});

    const navigation = useNavigation()
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [origin, setOrigin] = useState(undefined)
    const [departure, setDeparture] = useState(undefined)
    const [vehicle, setVehicle] = useState(undefined)
    const [destination, setDestination] = useState(undefined)
    const [timeTrip, setTimeTrip] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [placeCharger, setPlaceCharger] = useState(undefined)
    const [reserve, setReserve] = useState(undefined)
    const [planRoute, setPlanRoute] = useState([]) //origin and destination fields route
    const [totalDistance, setTotalDistance] = useState([])
    const [distance, setDistance] = useState([])
    const [makeTrip, setMakeTrip] = useState(false)
    const [search, setSearch] = useState(true)
    const [hideModal, setHideModal] = useState(false)
    const [waypoints, setWaypoints] = useState([])
    const [idTrip, setIdTrip] = useState(undefined)

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setUser(authUser);
        } catch (e) {
            setUser(null);
        };
    };

    useEffect(() => {
        checkUser();
    });

    useEffect(() => {
        const listener = (data) => {
            if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
                checkUser()
            }
        };
        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    });

    const onSignInPressed = async (data) => {
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const response = await Auth.signIn(data.username, data.password);
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
    };

    const getCurrentPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg("Permissão de acesso a localização negada.")
            return;
        }

        let location = await Location.getCurrentPositionAsync({})
        const coord = {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            longitudeDelta: 0.00999,
            latitudeDelta: 0.00499
        }
        setLocation(coord)
    };

    const locationOrigin = (data) => {
        setOrigin({
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421
        })
    };

    const locationDestination = (data, details = null) => {
        setDestination({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421
        })
    };

    const convertDate = e => {
        let day = e.getDate()
        let month = e.getMonth() + 1
        let year = e.getFullYear()
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        let date = day + "/" + month + "/" + year
        return date
    };

    const saveDeparture = e => {
        let hours = e.getHours()
        let minutes = e.getMinutes()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        let time = hours + ":" + minutes
        setDeparture(String(time))
    };

    const saveDistance = e => {
        setDistance(e)
    };

    const saveIdTrip = (e) => {
        setIdTrip(e);
    }

    const saveTotalDistance = e => {
        setTotalDistance(e)
    };

    const saveWaypoints = async (plan) => {
            await plan.map(item => {
                setWaypoints(current => [...current, 
                    {"latitude": item.destination.latitude, "longitude": item.destination.longitude}
                ]);
            });
    };

    const goToMap = () => {
        saveSearch(true);
        navigation.dispatch(JumpAction);
    };

    const saveVehicle = (e) => {
        console.log('e=>'+e)
        setVehicle(e);
        setHideModal(true);
    };

    const savePlaceCharger = (marker) => {
        setPlaceCharger(marker)
    };

    const saveTrip = () => {
        setMakeTrip(!makeTrip);
    };

    const cancelTrip = () => {
        setHideModal(true);
        setReserve(undefined);
        setPlanRoute([]);
        setMakeTrip(false);
        goToMap();     
    };

    const saveRoute = (o, d) => {
        let id = planRoute.length + 1
        setPlanRoute(current => [...current, {
            id: id,
            origin: {
                latitude: o.latitude,
                longitude: o.longitude,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421
            },
            destination: {
                latitude: d.latitude,
                longitude: d.longitude,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421
            },
            distance: distance
        }]);
    };

    const saveReserve = (e) => {
        setReserve(e)
    };

    const saveSearch = (e) => {
        setSearch(e);
    };

    const saveNotNow = (e) => {
        setHideModal(e)
    };

    return (
        <AuthContext.Provider value={{
            onSignInPressed,
            getCurrentPosition,
            locationDestination,
            locationOrigin,
            convertDate,
            saveDeparture,
            goToMap,
            savePlaceCharger,
            saveVehicle,
            saveDistance,
            saveTotalDistance,
            saveRoute,
            saveReserve,
            saveTrip,
            saveSearch,
            cancelTrip,
            saveNotNow,
            saveWaypoints,
            saveIdTrip,
            JumpAccount,
            signed: !!user,
            loading,
            location,
            user,
            origin,
            destination,
            departure,
            vehicle,
            distance,
            totalDistance,
            reserve,
            placeCharger,
            planRoute,
            makeTrip,
            search,
            hideModal,
            waypoints,
            idTrip
        }}>
            {children}
        </AuthContext.Provider>
    )
}