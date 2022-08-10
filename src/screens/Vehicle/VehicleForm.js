import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useForm } from 'react-hook-form';

import { listVehicles, listPluginTypes } from '../../graphql/queries';
import { createVehicle, updateVehicle, deleteVehicle } from '../../graphql/mutations';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from '../../aws-exports';

import { AuthContext } from '../../context/auth';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomPicker from '../../components/CustomPicker'

Amplify.configure(awsExports)

// const plug = [
//     { 'key': 1, "label": 'Tesla(Fast)', "value": 'Tesla(Fast)' },
//     { 'key': 2, "label": 'Tesla(Default)', "value": 'Tesla(Default)' },
//     { 'key': 3, "label": 'Tesla(Roadster)', "value": 'Tesla(Roadster)' },
//     { 'key': 4, "label": 'CSS/SAE', "value": 'CSS/SAE' },
//     { 'key': 5, "label": 'CHAdeMO', "value": 'CHAdeMO' },
//     { 'key': 6, "label": 'j-1772', "value": 'j-1772' },
//     { 'key': 7, "label": 'Type 2', "value": 'Type 2' },
//     { 'key': 8, "label": 'Type 3', "value": 'Type 3' },
//     { 'key': 9, "label": 'Three Phase', "value": 'Three Phase' },
//     { 'key': 10, "label": 'Caravan Mains', "value": 'Caravan Mains' },
//     { 'key': 11, "label": 'Commando', "value": 'Commando' },
//     { 'key': 12, "label": 'GB/T', "value": 'GB/T' },
//     { 'key': 13, "label": 'GB/T 2', "value": 'GB/T 2' },
//     { 'key': 14, "label": 'NEMA 14-50', "value": 'NEMA 14-50' },
//     { 'key': 15, "label": 'Wall', "value": 'Wall' }
// ]

const VehicleForm = ({navigation}) => {

    const [vehicle, setVehicle] = useState(undefined);
    const [allVehicles, setAllVehicle] = useState([])
    const [allPlugs, setAllPlugs] = useState([])
    const [type, setType] = useState(null)
    const [mutation, setMutation] = useState('add')
    const [loading, setLoading] = useState(false)
    const { saveSearch } = useContext(AuthContext)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(()=> {
        const map = navigation.addListener('tabPress', (e) => {    
            saveSearch(false);
            return map;
        })
    },[navigation]);

    useEffect(()=>{
        saveSearch(false);
    },[]);

    useEffect(()=>{
        componentDidMounVehicle();
        componentDidMounPlugs();
    },[]);

    const componentDidMounVehicle = async () => {
        try {
            const apiData = await API.graphql(graphqlOperation(listVehicles));
            setAllVehicle(apiData.data.listVehicles.items);
        } catch (err) {
            console.log('error: ', err);
        }           
    };

    const componentDidMounPlugs = async () => {
        try {    
            const apiData = await API.graphql(graphqlOperation(listPluginTypes))
            setAllPlugs(apiData.data.listPluginTypes.items);
        } catch (err) {
            console.log('error: ', err);
        }            
    };

    const AddVehicle = async data => {
        if (data.brand != '' && data.model != '' && data.type != null && data.plugintypeID != '' && data.year != '' && data.license != '') {
            
            try {
                await API.graphql(graphqlOperation(createVehicle, { input: data }));
            } catch (error) {
                console.log(error)
            }
            
        };
        componentDidMounVehicle();
        componentDidMounPlugs();
    };

    const UpdateVehicle = async data => {
        if (data.brand != '' && data.model != '' && data.type != '' && data.year != '' && data.license != '') {
            await API.graphql(graphqlOperation(updateVehicle, { input: data }));
        };
        setMutation('add')
        componentDidMounVehicle();
        componentDidMounPlugs();
    };

    const removeVehicle = async data => {
        const id = {
            id: data.id
        };
        await API.graphql(graphqlOperation(deleteVehicle, { input: id }));
    };

    // const Item = ({ item, onPress, backgroundColor, textColor }) => (
    //     <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    //         <Text style={[styles.titleItem, { color: textColor }]}>Modelo {item.model}</Text>
    //     </TouchableOpacity>
    // )

    // const renderItem = ({ item }) => {
    //     const backgroundColor = item.id === selectedId ? '#3B71F3' : 'white';
    //     const color = item.id === selectedId ? 'white' : 'black'
    //     return (
    //         <Item
    //             item={item}
    //             onPress={() => handlePress(item.id, item.brand, item.model, item.type, item.year, item.license)}
    //             backgroundColor={{backgroundColor}}
    //             textColor={color}
    //         />
    //     );
    // };

    const onChangeVehicle = (itemValue, itemIndex) => {
        console.log(itemValue)
        if (itemValue) {
            reset({
                brand: itemValue.brand,
                model: itemValue.model,
                type: itemValue.type,
                plugintypeID: itemValue.plugintypeID,
                year: itemValue.year,
                license: itemValue.license
            });
            setMutation('update')
        }
    };

    const saveVehicle = async (item) => {
        setLoading(true)
        try {
            if (mutation == 'add') {
                await AddVehicle(item)
            }

            if (mutation == 'update') {
                await UpdateVehicle(item)
            }
        } catch (error) {
            console.log('error=>' + error)
        }

        setLoading(false)

        Alert.alert(`Vehicle included.`)
    };

    const handleRemoveVehicle = () => {
        Alert.alert('remove')
    };
    

    const onPressType = (t) => {
        setType(t)
        reset({
            brand: null,
            type: t,
            model: null,
            year: null,
            license: null
        })
        setMutation('add')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register Vehicle</Text>
            <View style={styles.select}>
                <TouchableOpacity style={[styles.vehicleButton, { backgroundColor: 'eletric' === type ? '#406aac' : '#e3e3e3' }]}
                    onPress={() => onPressType('eletric')}
                >
                    <Text style={[styles.titleButton, { color: 'eletric' === type ? 'white' : 'black' }]}>Eletric</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.vehicleButton, { backgroundColor: 'hybrid' === type ? '#406aac' : '#e3e3e3' }]}
                    onPress={() => onPressType('hybrid')}
                >
                    <Text style={[styles.titleButton, { color: 'hybrid' === type ? 'white' : 'black' }]}>Hybrid</Text>
                </TouchableOpacity>
            </View>

            <>
                <CustomInput
                    name='type'
                    control={control}
                    style={styles.hidden}
                    hidden={true}
                />
                <CustomInput
                    name='brand'
                    placeholder='Brand'
                    control={control}
                    rules={{ required: 'Brand is necessary.' }}
                    style={styles.titleInput}
                />
                <CustomInput
                    name='model'
                    placeholder='Model'
                    control={control}
                    rules={{ required: 'Model is necessary.' }}
                    style={styles.titleInput}
                />
                <CustomPicker
                    name='plugintypeID'
                    control={control}
                    fields={allPlugs}
                    style={styles.input}
                    title='Plugin'
                />
                <CustomInput
                    name='year'
                    placeholder='Year'
                    control={control}
                    rules={{ required: 'Year is necessary.' }}
                    style={styles.titleInput}
                />
                <CustomInput
                    name='license'
                    placeholder='License'
                    control={control}
                    rules={{ required: 'License is necessary.' }}
                    style={styles.titleInput}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25}}>
                    <CustomButton
                        type='REGISTER'
                        text={loading ? 'Registering' : 'Save'}
                        onPress={handleSubmit(saveVehicle)}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={handleRemoveVehicle}
                    >
                        <Icon name='pencil-remove' color={'white'} size={26} style={styles.alignIcon} />
                    </TouchableOpacity>
                </View>
            </>

            {allVehicles.length > 0 &&
                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={styles.titleItem}>List Vehicle</Text>
                    <Picker
                        selectedValue={vehicle}
                        style={{ marginBottom: 10 }}
                        onValueChange={onChangeVehicle}
                    >
                        {allVehicles.map(item =>
                            <Picker.Item key={item.id} label={item.brand + '/Model ' + item.model + '/Year ' + item.year} value={item} />
                        )}
                    </Picker>
                </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        top: 45
    },
    containerList: {
        flex: 1,
        width: '100%',
        marginTop: 30,
        marginVertical: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    item: {
        padding: 10,
        width: '100%',
        borderRadius: 40,
        borderColor: '#2b3352',
        borderWidth: 1,
        paddingVertical: 20,
    },
    titleItem: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    title: {
        marginTop: 5,
        fontSize: 24,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    select: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    vehicleButton: {
        height: 120,
        width: 150,
        elevate: 2,
        shadowColor: '#e3e3e3',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        alignContent: 'center'
    },
    titleButton: {
        padding: 40,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    titleInput: {
        fontSize: 20,
        padding: 10,
    },
    input: {
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderRadius: 22,
        fontSize: 20,
        borderWidth: 1,
    },
    icon: {
        borderRadius: 50,
        height: 50,
        width: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        marginTop: 5,
        elevation: 5,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        backgroundColor: 'tomato',
    },
    alignIcon: {
        alignItems: 'center',
        padding: 10
    },
    hidden: {
        color: 'white',
        position: 'absolute'
    }
})

export default VehicleForm