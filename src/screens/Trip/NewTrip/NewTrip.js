import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, FlatList, TouchableOpacity, Alert, Button } from 'react-native';

import CustomPlaceInput from '../../../components/CustomPlaceInput';
import DatePicker from 'react-native-modal-datetime-picker';

import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from '../../../aws-exports'
import { listVehicles } from '../../../graphql/queries';

import { AuthContext } from '../../../context/auth';

Amplify.configure(awsExports)

const NewTrip = () => {

    const navigation = useNavigation();

    const { locationDestination,
        locationOrigin,
        dateOut,
        departure,
        saveDeparture,
        saveDate,
        saveVehicle,
        vehicle } = useContext(AuthContext);

    const [showDate, setShowDate] = useState(false);
    const [showDeparture, setShowDeparture] = useState(false);

    const [cars, setCars] = useState([]);

    const componentDidMount = async () => {
        try {
            const apiData = await API.graphql(graphqlOperation(listVehicles));
            setCars(apiData.data.listVehicles.items)
        } catch (err) {
            console.log('error: ', err);
        }
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    const goToMap = () => {
        navigation.navigate('Map')
    }
    const getDateOut = () => {
        setShowDate(true)
    }
    const getDeparture = () => {
        setShowDeparture(true)
    }
    const onTimeSelected = (date) => {
        saveDeparture(date)
        setShowDeparture(false)
    }
    const onDateSelected = (date) => {
        saveDate(date)
        setShowDate(false)
    }
    const onSaveVehicle = (itemValue, itemIndex) => {
        saveVehicle(itemValue)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Building A Route</Text>
            <View style={styles.card}>

                <Picker
                    selectedValue={vehicle}
                    style={[styles.input, { marginBottom: 10 }]}
                    onValueChange={onSaveVehicle}>
                    {cars.map(item => {
                        return (
                            <Picker.Item key={item.id} label={item.brand + '/Model ' + item.model+ '/Year ' + item.year} value={`${item.brand}/Model${item.model}/Year${item.year}`}  />
                        )
                    }
                    )}
                </Picker>

                <CustomPlaceInput
                    placeholder="Origin"
                    onPress={locationOrigin}
                />
                <CustomPlaceInput
                    placeholder="Destination"
                    onPress={locationDestination}
                />
            </View>
            <View style={styles.card}>
                <Text style={styles.subTitle}>Check Out</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder={dateOut ? dateOut : 'Choose the Date'}
                        name='date'
                        onPressIn={getDateOut}
                    />
                </View>
                {showDate && (
                    <DatePicker
                        isVisible={showDate}
                        mode="date"
                        onConfirm={onDateSelected}
                        onCancel={() => { setShowDate(false) }}
                    />
                )}
                <View style={styles.input}>
                    <TextInput
                        placeholder={departure ? departure : 'Choose the Time'}
                        name='departure'
                        onPressIn={getDeparture}
                    />
                </View>
                {showDeparture && (
                    <DatePicker
                        isVisible={showDeparture}
                        mode="time"
                        locale='pt-br'
                        onConfirm={onTimeSelected}
                        onCancel={() => { setShowDeparture(false) }}
                    />
                )}
            </View>
            <View style={styles.card}>
                <Button
                    title='Go To Map'
                    onPress={goToMap}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        top: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderRadius: 5,
        margin: 20,
        position: 'relative'
    },
    container: {
        alignSelf: 'auto'
    },
    title: {
        position: 'relative',
        top: 30,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    subTitle: {
        position: 'relative',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        fontSize: 20,
        padding: 15,
        borderWidth: 1,
        borderRadius: 5
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        borderColor: '#3B71F3',
        borderWidth: 2
    },
    titleItem: {
        fontSize: 16
    },
});

export default NewTrip