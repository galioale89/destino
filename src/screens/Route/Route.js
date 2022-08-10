import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    ImageBackground,
} from 'react-native';
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modal-datetime-picker';

import { listVehicles, listSchedules, listPluginStations, listEletrostations, listPluginTypes, listTrips } from '../../graphql/queries';
import { createSchedule, createRoute } from '../../graphql/mutations';

import { API, graphqlOperation, SortDirection } from 'aws-amplify';

import { AuthContext } from '../../context/auth';
import { ActivityIndicator } from 'react-native-paper';

import ContainerCar from '../../../assets/images/containerCar.jpg'

const listHour = [
    { id: '1', title: '1->1:30' },
    { id: '2', title: '1:30->2' },
    { id: '3', title: '2->2:30' },
    { id: '4', title: '2:30->3' },
    { id: '5', title: '3->3:30' },
    { id: '6', title: '3:30->4' },
    { id: '7', title: '4->4:30' },
    { id: '8', title: '4:30->5' },
    { id: '9', title: '5->5:30' },
    { id: '10', title: '5:30->6' },
    { id: '11', title: '6->6:30' },
    { id: '12', title: '6:30->7' },
    { id: '13', title: '7->7:30' },
    { id: '14', title: '7:30->8' },
    { id: '15', title: '8->8:30' },
    { id: '16', title: '8:30->9' },
    { id: '17', title: '9->9:30' },
    { id: '18', title: '9:30->10' },
    { id: '19', title: '10->10:30' },
    { id: '20', title: '10:30->11' },
    { id: '21', title: '11->11:30' },
    { id: '22', title: '11:30->12' }
]

// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//     <TouchableOpacity
//         style={[styles.button, backgroundColor]}
//         onPress={onPress}
//     ><Text style={[styles.titleButton, { color: textColor }]}>{item.name_station}{`\n(${item.name_plug})`}</Text>
//     </TouchableOpacity>
// )

export default class Route extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)

        this.state = {
            dataSource: [],
            allVehicles: [],
            period: null,
            showDate: false,
            dateReservation: null,
            loading: false,
            showInterval: false,
            vehicle: '',
            plugInStations: [],
            eletrostations: [],
            selectedId: null
        };

        this.componentDidMount();
    };

    componentDidMount = async () => {
        try {
            const apiPlugStation = await API.graphql(graphqlOperation(listPluginStations));
            this.setState({
                plugInStations: apiPlugStation.data.listPluginStations.items
            });

            const apiVehicle = await API.graphql(graphqlOperation(listVehicles));
            if (apiVehicle != '') {
                this.setState({
                    allVehicles: apiVehicle.data.listVehicles.items
                });
            }
            this.context.saveSearch(false);
        } catch (error) {
            console.log('Erro to find vehicles ' + error)
        }
        const apiEletrostations = await API.graphql(graphqlOperation(listEletrostations));
        this.setState({
            eletrostations: apiEletrostations.data.listEletrostations.items
        });

        this.context.saveSearch(false);

    };

    componenteDistanceMount = () => {
        let totalDistance = 0;
        try {
            this.context.planRoute.map(item => {
                totalDistance = totalDistance + item.distance;
            });
            return totalDistance;
        } catch (error) {
            console.log(error);
        }
    };

    onDateSelected = data => {
        this.setState({
            showDate: false
        });
        this.onSaveDateReservation(data);
    };

    onSaveDateReservation = (data) => {
        this.setState({
            dateReservation: this.context.convertDate(data)
        })
    };

    addSchedule = (data) => {
        data.map(async item => {
            try {
                await API.graphql(graphqlOperation(createSchedule, { input: item }));
            } catch (error) {
                console.log(error);
            }
        });
    };

    addRoute = async (data) => {
        try {
            await API.graphql(graphqlOperation(createRoute, { input: data }));
            this.context.savePlaceCharger(undefined);
        } catch (error) {
            console.log(error);
        }
    };

    onSelectItem = data => {
        data.item.isSelect = !data.item.isSelect
        data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list

        const index = this.state.dataSource.findIndex(
            item => data.item.id === item.id
        )

        data.item.period = this.state.period

        this.state.dataSource[index] = data.item
        this.setState({
            dataSource: this.state.dataSource,
        });
    };

    handleVehicle = (itemValue, itemIndex) => {
        console.log('itemValue=>'+itemValue)
        this.setState({
            vehicle: itemValue
        });
    };


    getIdPlugStation = (id) => {
        const plugs = []
        const allPlugStations = this.state.plugInStations
        allPlugStations.map(item => {
            if (item.eletrostationID === id) {
                plugs.push(item.id)
            }
        })

        return plugs[0]
    };

    onSaveReservation = async () => {
        let lastPlace = [];
        let route = [];
        let data = this.context.planRoute;
        let lengthData = data.length;
        let date = this.state.dateReservation;
        let day = date.substring(0,2);
        let month = date.substring(3,5);
        let year = date.substring(6,11);
        try {
            if (data != '') {
                lastPlace = data[lengthData - 1]
                await this.context.saveRoute(lastPlace.destination, this.context.placeCharger)
                this.context.locationOrigin(this.context.placeCharger)
            } else {
                await this.context.saveRoute(this.context.location, this.context.placeCharger)
                this.context.locationOrigin(this.context.placeCharger)
            }
            this.context.saveTotalDistance(this.componenteDistanceMount());

            let list = this.state.dataSource;
            const schedule = []
            list.map(item => {
                if (item.isSelect) {
                    schedule.push({ day: day, month: month, year: year, interval: item.title, period: item.period, pluginstationID: this.state.selectedId })
                }
            });
            await this.context.saveWaypoints(this.context.planRoute);
            this.addSchedule(schedule);
            this.context.planRoute.map(item => {
                route = {
                    origin: { latitude: item.origin.latitude, longitude: item.origin.longitude },
                    destination: { latitude: item.destination.latitude, longitude: item.destination.longitude },
                    distance: item.distance,
                    date_out: this.state.dateReservation,
                    time: 0,
                    pluginstationID: this.state.selectedId
                }
            })
            this.addRoute(route);
            this.context.saveReserve(undefined);
            this.context.goToMap();
        } catch (error) {
            console.log(error)
        }
    };

    onSaveVehicle = async () => {
        let apiData = await API.graphql(graphqlOperation(listVehicles, {
            filter: {
                id: {
                    eq: this.state.vehicle
                }
            }
        }))
        console.log(await apiData.data.listVehicle.items);
        this.context.saveVehicle(await apiData.data.listVehicle.items);
    };

    onNotNowVehicle = () => {
        this.context.saveNotNow(true);
    };

    onPressType = async (type) => {

        this.setState({
            loading: true,
            period: type,
            showInterval: false
        });

        let resHour = listHour;
        let findBlock = false

        let date = this.state.dateReservation;

        let year = date.substring(6, 10);
        let month = date.substring(3, 5);
        if (month[0] == 0) {
            month = month.slice(1, 2);
        }
        let day = date.substring(0, 2);
        if (day[0] == 0) {
            day = day.slice(1, 2);
        }

        let apiData = await API.graphql(graphqlOperation(listSchedules, {
            filter: {
                pluginstationID: {
                    eq: this.state.selectedId
                }
            }
        }));
        let dataSchedule = apiData.data.listSchedules.items;
        if (dataSchedule != '') {
            listHour.map(async item => {
                for (let schedule of dataSchedule) {

                    if (schedule.period != null && schedule.period == type && schedule.day == day && schedule.month == month &&
                        schedule.year == year && schedule.interval == item.title) {
                        findBlock = true
                    }

                    if (findBlock) {
                        item.inUse = true;
                        item.selectedClass = styles.block;
                    } else {
                        item.inUse = false;
                        item.selectedClass = styles.list;
                    }

                    item.period = type;
                    item.isSelect = false;

                    findBlock = false

                    return item;
                }
            });
        } else {
            listHour.map(async item => {
                item.inUse = false;
                item.selectedClass = styles.list;
                item.period = type;
                item.isSelect = false;
                return item;
            })
        }
        this.setState({
            dataSource: resHour,
            loading: false,
            showInterval: true
        });

    };

    handleSelectedId = (id) => {
        this.setState({ selectedId: id })
    }

    renderItem = data =>
        <TouchableOpacity
            activeOpacity={data.item.inUse ? 0.6 : 0}
            disabled={data.item.inUse ? true : false}
            style={[styles.item, data.item.selectedClass]}
            onPress={() => this.onSelectItem(data)}
        >
            <Text style={[styles.title, { color: 'white' }]}>{data.item.title}</Text>
        </TouchableOpacity>

    renderCharger = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.button, { backgroundColor: item.id_station === this.state.selectedId ? '#406aac' : '#e3e3e3' }]}
                onPress={(e) => this.handleSelectedId(item.id_station)}
            ><Text style={[styles.titleButton, { color: item.id_station === this.state.selectedId ? 'white' : '#406aac' }]}>{item.name_station}{`\n(${item.name_plug})`}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            (this.context.reserve ?
                <ImageBackground
                    source={ContainerCar}>
                    <Modal
                        isVisible={this.context.hideModal ? false : true}
                        transparent={true}
                        statusBarTranslucent={true}
                        animationType='slide'
                        hasBackdrop={false}
                    >
                        <View style={styles.modalView}>
                            <Text style={{ fontSize: 30, padding: 10, fontWeight: 'bold' }}>Choose A Vehicle </Text>
                            <View style={styles.input}>
                                <Picker
                                    selectedValue={this.vehicle}
                                    onValueChange={this.handleVehicle}>
                                    {this.state.allVehicles.map(item =>
                                        <Picker.Item key={item.id} label={item.brand + '/Model ' + item.model + '/Year ' + item.year} value={item.id} />
                                    )}
                                </Picker>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={this.onSaveVehicle}
                                >
                                    <Text style={styles.textStyle}>Confirm</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonCancel]}
                                    onPress={this.context.cancelTrip}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={this.onNotNowVehicle}
                                >
                                    <Text style={styles.textStyle}>Not Now</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.container}>
                        {this.context.hideModal &&
                            <>
                                <View style={styles.card}>
                                    <Text style={styles.titleHead}>Details</Text>
                                    <Text style={styles.titleHead}>Address:</Text>
                                    <Text style={styles.titleHead}>{this.context.reserve.name} </Text>
                                    {this.context.vehicle &&
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.titleHead}>Vehicle: </Text>
                                            <Text>{this.context.vehicle}</Text>
                                        </View>
                                    }
                                </View>
                                <View style={styles.card}>
                                    <Text style={styles.titleHead}>Choose A Charger</Text>
                                    <FlatList
                                        contentContainerStyle={{ height: 100 }}
                                        numColumns={3}
                                        data={this.context.reserve.plugins}
                                        renderItem={this.renderCharger}
                                        keyExtractor={(item) => item.id_station}
                                        extraData={this.selectedId}
                                    />
                                </View>
                                <View style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
                                    <Text style={[styles.titleHead, { marginTop: 3 }]}>Date Departure:</Text>
                                    <Pressable
                                        onPress={() => this.setState({ showDate: true })}
                                        style={[styles.input, { left: 5, width: '60%', color: this.state.dateReservation ? 'black' : '#e3e3e3' }]}
                                    ><Text>{this.state.dateReservation ? this.state.dateReservation : 'Click to date'}</Text>
                                    </Pressable>
                                    <DatePicker
                                        isVisible={this.state.showDate}
                                        mode='date'
                                        onConfirm={this.onDateSelected}
                                        onCancel={() => this.setState({ showDate: false })}
                                    />

                                </View>
                                {this.state.dateReservation && this.state.selectedId &&
                                    <View style={[styles.containerSchedule]}>
                                        {this.state.dateReservation &&
                                            <View style={styles.card}>
                                                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                                    <Text style={[styles.titleHead, { marginTop: 10 }]}>Choose A Period</Text>
                                                </View>
                                                <View style={styles.select}>
                                                    <TouchableOpacity style={[styles.chooseButton, styles.alignIcon, { backgroundColor: 'morning' === this.state.period ? '#406aac' : '#e3e3e3' }]}
                                                        onPress={() => this.onPressType('morning')}
                                                    >
                                                        <Text style={{ color: 'morning' === this.state.period ? 'white' : '#2b3352' }}>
                                                            <Icon name='weather-sunset-up' size={50} color={'morning' === this.state.period ? 'white' : '#2b3352'} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[styles.chooseButton, styles.alignIcon, { backgroundColor: 'afternoon' === this.state.period ? '#406aac' : '#e3e3e3' }]}
                                                        onPress={() => this.onPressType('afternoon')}
                                                    >
                                                        <Text style={{ color: 'afternoon' === this.state.period ? 'white' : '#2b3352' }}>
                                                            <Icon name='weather-sunset-down' size={50} color={'afternoon' === this.state.period ? 'white' : '#2b3352'} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.loading ?
                                    <ActivityIndicator />
                                    :
                                    <>
                                        <Modal
                                            transparent={true}
                                            statusBarTranslucent={true}
                                            animationType='slide'
                                            hasBackdrop={false}
                                            isVisible={this.state.showInterval ? true : false}
                                        >
                                            <View style={[styles.modalView, { top: 70 }]}>
                                                <Text style={[styles.titleItem, { margin: 15 }]}>Choose A Free Time</Text>
                                                <FlatList
                                                    numColumns={4}
                                                    data={this.state.dataSource}
                                                    renderItem={item => this.renderItem(item)}
                                                    keyExtractor={(item) => item.id}
                                                    extraData={this.state}
                                                />
                                                <TouchableOpacity
                                                    style={styles.buttonSave}
                                                    onPress={this.onSaveReservation}
                                                >
                                                    <Text style={[styles.titleButton, { color: 'white' }]}>Save Reservation</Text>
                                                </TouchableOpacity>
                                                <View>
                                                    <Pressable
                                                        style={[styles.button, styles.buttonClose]}
                                                        onPress={() => this.setState({ showInterval: false })}
                                                    ><Text style={[styles.titleButton, { color: 'white' }]}>Close</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </Modal>
                                    </>
                                }
                            </>
                        }
                    </View>
                </ImageBackground>
                :
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>All Routes</Text>
                </View>
            )
        );
    };
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: 'rgba(43,51,82,0.2)',
        borderWidth: 1,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        padding: 10
    },
    container: {
        width: '100%',
        height: '100%',
        padding: 30,
        justifyContent: 'center'
    },
    item: {
        marginVertical: 2,
        borderRadius: 20,
        marginRight: 2,
        paddingVertical: 15,
        alignItems: 'center',
        width: 75
    },
    titleItem: {
        fontSize: 20,
        alignItems: 'center',
        fontWeight: 'bold'
    },
    titleHead: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#406aac'
    },
    input: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderColor: '#e3e3e3',
        borderRadius: 40,
        fontSize: 20,
        justifyContent: 'center',
        borderWidth: 1,
    },
    selected: {
        backgroundColor: '#ffa500',
    },
    list: {
        backgroundColor: '#2b3352',
    },
    select: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    chooseButton: {
        height: 80,
        width: 150,
        elevate: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.5,
        borderColor: '#2b3352',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        borderBottomWidth: 15,
        borderBottomColor: '#2b3352',
        margin: 10,
        alignItems: 'center',
        alignContent: 'center',
        activeOpacity: 0.2
    },
    buttonSave: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            height: 1,
            width: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        marginRight: 15,
        bottom: 80,
        position: 'absolute',
        paddingVertical: 15,
        paddingHorizontal: 15,
        shadowOpacity: 0.25,
        backgroundColor: '#406aac',
        right: 20,
        activeOpacity: 0.2
    },
    titleButton: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    alignIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    block: {
        backgroundColor: 'tomato'
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
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 30,
        width: '100%',
        borderRadius: 30,
        padding: 20,
    },
    button: {
        marginHorizontal: 5,
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 10,
        elevation: 2,
        activeOpacity: 0.2
    },
    buttonOpen: {
        backgroundColor: "#406aac",
        activeOpacity: 0.2
    },
    buttonClose: {
        backgroundColor: "tomato",
        activeOpacity: 0.2
    },
    buttonCancel: {
        backgroundColor: "#ffa500",
        activeOpacity: 0.2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    }
})