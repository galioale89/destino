import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";

import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { AuthContext } from '../../context/auth';

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { listEletrostations, listPluginStations, listPluginTypes, listTrips } from '../../graphql/queries';
import { createTrip, deleteTrip, updateTrip } from '../../graphql/mutations'
import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

// import {GOOGLE_APIKEY} from 'react-native-dotenv';

const GOOGLE_APIKEY = "AIzaSyChZa94ZxYjZpLhIddiD9i0ygxwTGOyjTE";

import Plug from '../../../assets/images/pinFree.png';


const Map = ({ navigation }) => {

    const [title, setTitle] = useState(null)
    const [plug, setPlug] = useState([])
    const [destinationCharge, setDestinationCharge] = useState(null);
    const [markers, setMarkers] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [prevTotalDistance, setPrevTotalDistance] = useState(null);

    const { origin,
        destination,
        location,
        placeCharger,
        getCurrentPosition,
        planRoute,
        distance,
        makeTrip,
        saveTrip,
        saveSearch,
        saveNotNow,
        savePlaceCharger,
        saveIdTrip,
        saveDistance,
        saveReserve,
        waypoints,
        totalDistance,
        cancelTrip,
        idTrip } = useContext(AuthContext);

    const n = useNavigation();

    useEffect(() => {
        const search = navigation.addListener('tabPress', (e) => {
            saveSearch(true);
            return search;
        })
    }, [navigation]);


    const componentDidMount = async () => {

        let eletrostations = []
        let chargerTypes = []

        const apiDataStation = await API.graphql(graphqlOperation(listEletrostations));
        const dataStation = apiDataStation.data.listEletrostations.items;

        for (let eletrostation of dataStation) {

            let dataPlugStation = await API.graphql(graphqlOperation(listPluginStations, {
                filter: {
                    eletrostationID: {
                        eq: eletrostation.id
                    }
                }
            }));

            let dataPlugins = await dataPlugStation.data.listPluginStations.items;

            for (let i of dataPlugins) {
                let typeCharger = await API.graphql(graphqlOperation(listPluginTypes, {
                    filter: {
                        id: {
                            eq: i.plugintypeID
                        }
                    }
                }))
                let type = typeCharger.data.listPluginTypes.items;
                for (let t of type) {
                    chargerTypes.push({ id_station: i.id, id_plug: t.id, name_station: i.name, name_plug: t.name })
                }
            }
            eletrostations.push({
                id: eletrostation.id,
                name: eletrostation.name,
                plugins: chargerTypes,
                latitude: parseFloat(eletrostation.latitude),
                longitude: parseFloat(eletrostation.longitude)
            })
            chargerTypes = []

        }

        var trips = await API.graphql(graphqlOperation(listTrips, {
            sort: {
                direction: 'DESC',
                field: 'id'
            }
        }))
        var data = trips.data.listTrips.items;
        data.map(t => {
            saveIdTrip(t.id)
        })

        setMarkers(eletrostations)
    }

    const calcDistance = (km, time) => {
        let lastTotalDistance = totalDistance;
        let calcTotalDistance = lastTotalDistance + km;
        setPrevTotalDistance(parseFloat(calcTotalDistance).toFixed(2));
        saveDistance(km.toFixed(2));
    };

    const handleModal = (result, marker) => {

        setDestinationCharge({
            latitude: result.nativeEvent.coordinate.latitude,
            longitude: result.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421
        });
        getMarker(marker);
        setIsModalVisible(true);
    }

    const getLastTrip = async () => {
        var trips = await API.graphql(graphqlOperation(listTrips, {
            sort: {
                direction: 'DESC',
                field: 'id'
            }
        }))
        return trips.data.listTrips.items;
    }

    const saveNewTrip = async (data) => {
        try {
            var trips = await API.graphql(graphqlOperation(listTrips, {
                sort: {
                    direction: 'DESC',
                    field: 'id'
                }
            }))
            var data = trips.data.listTrips.items;
            if (data == '') {
                newTrip = true;
            } else {
                if (data[0].status != 'inserting') {
                    newTrip = true;
                }
            }
            if (newTrip) {
                await API.graphql(graphqlOperation(createTrip, { input: data }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onCreateNewTrip = () => {
        if (makeTrip == false) {
            saveTrip();
        }
        setIsModalVisible(false);
        saveReserve(placeCharger);
        saveSearch(false);
        saveNotNow(false);

        let date = String(new Date().toISOString())
        date = date.slice(11, date.length)
        let trip = {
            origin: '',
            status: "inserting",
            destination: '',
            hour_out: date,
            hour_arrive: date,
            distance: 0,
        }

        saveNewTrip(trip);

        n.navigate('Route');
    }

    const handleCancelTrip = async () => {

        await API.graphql(graphqlOperation(listTrips, {
            sort: {
                direction: 'DESC',
                field: 'id'
            }
        })).then(async trips => {
            let dataTrip = trips.data.listTrips.items;
            dataTrip.map(async item => {
                if (item.status == 'inserting') {
                    let details = { id: item.id };
                    try {
                        await API.graphql({
                            query: deleteTrip,
                            variables: {
                                input: details,
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }

                }
            })

            setIsModalVisible(false);
            cancelTrip();
            saveTrip();
        })
    }

    const signOut = () => {
        Auth.signOut();
    };

    useEffect(() => {
        componentDidMount();
    })

    useEffect(() => {
        getCurrentPosition();
    }, []);

    const mapView = useRef(null);

    // const calcDistance = (lat1, lon1, lat2, lon2) => {
    //     let R = 6356.89;
    //     let dLat = (lat2 - lat1) * (Math.PI / 180);
    //     let dLon = (lon2 - lon1) * (Math.PI / 180);

    //     // let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
    //     // Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180));
    //     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    //     let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     let d = R * c;
    //     d = d.toFixed(2);

    //     return d;
    // }

    // const goToRoute = details => {
    //     saveTotalDistance(details);
    // }

    // const getCoord = (result) => {
    //     let lat = location.latitude
    //     let lon = location.longitude
    //     if (origin) {
    //         lat = origin.latitude
    //         lon = origin.longitude
    //     }
    //     return calcDistance(lat, lon, result.nativeEvent.coordinate.latitude, result.nativeEvent.coordinate.longitude);
    // }

    const confirmTrip =  async() => {
        const details = {
            id: idTrip,
            status: 'finished'
        }
        const dataApi = await API.graphql({
            query: updateTrip,
            variables: {
                input: details
            }
        })
    }

    const getMarker = (marker) => {
        setTitle(marker.name);

        let allPlugs = marker.plugins;
        setPlug([]);
        allPlugs.map(async item => {
            setPlug(current => [...current, item.name_plug]);
        });

        savePlaceCharger(marker);
    }

    return (

        <View style={styles.container}>

            {makeTrip &&
                <TouchableOpacity
                    onPress={confirmTrip}
                    style={[styles.icon, styles.iconroad]}>
                    <Icon style={styles.alignIcon} name='road' color='white' size={26} />
                </TouchableOpacity>
            }

            <TouchableOpacity
                onPress={signOut}
                style={[styles.icon, styles.iconexit]}>
                <Icon style={styles.alignIcon} name='exit-run' color='white' size={26} />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                transparent={true}
                statusBarTranslucent={true}
                animationType='slide'
                hasBackdrop={false}
            >
                <View style={styles.modalView}>
                    <Text>Place: {title}</Text>
                    <Text>Type Plug:
                        {plug.map(i =>
                            `${i}|`
                        )}
                    </Text>
                    <Text>Route's Distance: {distance} km</Text>
                    <Text>Total Distance: {prevTotalDistance} km</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={onCreateNewTrip}
                        >
                            {makeTrip ?
                                <Text style={styles.textStyle}>Reserve</Text>
                                :
                                <Text style={styles.textStyle}>New Trip</Text>
                            }
                        </Pressable>
                        {makeTrip &&
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={handleCancelTrip}
                            ><Text style={styles.textStyle}>Cancel Trip</Text>
                            </Pressable>
                        }
                        <Pressable
                            style={[styles.button, styles.buttonClose, styles.alignIcon]}
                            onPress={() => setIsModalVisible(!isModalVisible)}
                        ><Icon name='close' color='white' size={24} />
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <MapView
                style={styles.map}
                initialRegion={location ? location : origin}
                loadingEnabled={true}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                ref={mapView}
            >
                {
                    markers.map(marker => {
                        return (
                            <Marker
                                key={marker.id}
                                title={marker.name}
                                description={marker.name_type}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude
                                }}
                                image={Plug}
                                onPress={e => (handleModal(e, marker))}
                            >
                                <MapView.Callout>
                                    <View>
                                        <Text style={{ fontSize: 10, padding: 5 }}>
                                            {marker.name}
                                        </Text>
                                    </View>
                                </MapView.Callout>
                            </Marker>
                        )
                    })
                }

                {planRoute.map(item =>
                    <MapViewDirections
                        key={item.id}
                        origin={item.origin}
                        destination={item.destination}
                        apikey="AIzaSyChZa94ZxYjZpLhIddiD9i0ygxwTGOyjTE"
                        strokeWidth={3}
                        strokeColor='tomato'
                        timePrecision='now'
                        onReady={result => {
                            calcDistance(result.distance, result.getRealTime)
                            mapView.current.fitToCoordinates(
                                result.coordinates, {
                                edgePadding: {
                                    top: 50,
                                    bottom: 50,
                                    left: 50,
                                    right: 50
                                }
                            }
                            )
                        }}
                    />
                )}
                {destinationCharge &&
                    <MapViewDirections
                        origin={origin ? origin : location}
                        destination={destinationCharge}
                        apikey={GOOGLE_APIKEY}
                        strokeWidth={3}
                        strokeColor='#ffa500'
                        timePrecision='now'
                        onReady={result => {
                            calcDistance(result.distance, result.getRealTime)
                            mapView.current.fitToCoordinates(
                                result.coordinates, {
                                edgePadding: {
                                    top: 50,
                                    bottom: 50,
                                    left: 50,
                                    right: 50
                                }
                            })
                        }}
                    />
                }
                {destination &&
                    <>
                        {waypoints.map((item, index) => {
                            <Marker
                                key={`coordinate_${index}`}
                                coordinate={item}
                            />
                        })}
                        <Marker
                            key={0}
                            coordinate={destination}
                        />

                        <MapViewDirections
                            origin={location}
                            destination={destination}
                            apikey={GOOGLE_APIKEY}
                            waypoints={waypoints}
                            optimizeWaypoints={true}
                            strokeWidth={3}
                            timePrecision='now'
                            onStart={(params) => {
                                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                            }}
                            strokeColor='#406aac'
                            onReady={result => {
                                calcDistance(result.distance, result.getRealTime)
                                mapView.current.fitToCoordinates(
                                    result.coordinates, {
                                    edgePadding: {
                                        top: 50,
                                        bottom: 50,
                                        left: 50,
                                        right: 50
                                    }
                                }
                                )
                            }}
                        />
                    </>
                }
            </MapView>

        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '80%',
        maxWidth: 300,
        maxHeight: 200,
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '98%',
        top: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 5,
        position: 'relative',
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        borderRadius: 20,
        padding: 2,
        paddingHorizontal: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#406aac"
    },
    buttonClose: {
        backgroundColor: "tomato"
    },
    buttonCancel: {
        backgroundColor: "#ffa500"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalView: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 2,
        backgroundColor: 'white',
        maxHeight: 180,
        width: '100%',
        top: -180,
        borderRadius: 10,
        padding: 20,
    },
    icon: {
        position: 'absolute',
        flex: 1,
        zIndex: 1,
        borderRadius: 50,
        height: 50,
        width: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        right: 20
    },
    iconexit:{
        bottom: 50,
        backgroundColor: '#ffa500',
    },
    iconroad:{
        top: 80,
        backgroundColor: 'green',
    },
    alignIcon: {
        alignItems: 'center',
        padding: 10
    }
})

export default Map