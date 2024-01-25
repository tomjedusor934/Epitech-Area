import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import Datacard from '../component/datacard.js';
import MainContainer from '../component/MainContainer.js';
import Bigtext from '../text/Bigtext.js';
import Picturecard from '../component/picturecard.js';
import Topbar from '../component/topbg.js';
import NavBar from '../component/navBar/navBar.js';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useNavigation } from '@react-navigation/native';

function Dashboard() {
    const navigation = useNavigation();
    const [state, setState] = useState('dashboard');
    const [data, setData] = useState(null);

    const editState = (newState) => {
        setState(newState);
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                return;
            }

            const username = await AsyncStorage.getItem('username');

            try {
                const response = await fetch('https://api.area.tal-web.com/user/infos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                        'username': username
                    }
                });

                const userData = await response.json();
                setData(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: 'rgb(245, 245, 245)' }}>
            <NavBar />

            <View
                style={{
                    flex: 1,
                    marginTop: 65,
                    marginHorizontal: 30,
                    marginBottom: 90,
                }}
            >
                <Text
                    style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'black',
                    }}
                >
                    Dashboard
                </Text>

                <View
                    style={{
                        width: '100%',
                        backgroundColor: 'white',
                        marginTop: 20,
                        borderRadius: 20,
                        padding: 25,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'black',
                        }}
                    >
                        Bienvenue sur Reactify Tom !
                    </Text>

                    <Text
                        style={{
                            fontSize: 15,
                            color: 'black',
                            marginTop: 10,
                            fontWeight: '600',
                        }}
                    >
                        Créer des vos propes A/rea et partager les avec vos amis !
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('MesArea')}
                    >
                        <View
                            style={{
                                width: 150,
                                height: 40,
                                backgroundColor: 'rgb(0, 0, 255)',
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                Voir mes A/rea
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 30,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: '48%',
                            height: 200,
                            borderRadius: 20,
                            padding: 15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    borderRadius: 50,
                                    backgroundColor: 'red',
                                    padding: 5,
                                }}
                            >
                                <Ionicons
                                    name='notifications'
                                    size={20}
                                    color='white'
                                    onPress={() => navigation.navigate('Notifications')}
                                />
                            </View>

                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}
                            >
                                Notifications
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: 'white',
                            width: '48%',
                            height: 200,
                            borderRadius: 20,
                            padding: 15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    borderRadius: 50,
                                    backgroundColor: 'rgb(215, 215, 215)',
                                    padding: 5,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name='account'
                                    size={20}
                                    color='white'
                                    onPress={() => navigation.navigate('Profile')}
                                />
                            </View>

                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}
                            >
                                Mon compte
                            </Text>
                        </View>

                        <View
                            style={{
                                padding: 20,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 15,
                                    color: 'black',
                                    marginTop: 10,
                                    fontWeight: '600',
                                }}
                            >
                                Name: {data && data.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: 'black',
                                    marginTop: 10,
                                    fontWeight: '600',
                                }}
                            >
                                Surname: {data && data.surname}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: 'black',
                                    marginTop: 10,
                                    fontWeight: '600',
                                }}
                            >
                                Sexe: {data && data.sexe}
                            </Text>
                        </View>
                    </View>
                </View>

            </View>

            {/* <MainContainer style={{ backgroundColor: 'transparent', marginBottom: 0 }}>
                <View style={styles.line}>
                    <Bigtext style={styles.text}>Hello, Tom</Bigtext>
                    <Image source={require('../assets/images.png')} style={styles.image} />
                </View>
                <ScrollView>
                    <Datacard
                        title="A/rea éffectué"
                        data="7/10"
                        icon="monitor-dashboard"
                        style={{ marginBottom: 20 }}
                    />
                    <View style={styles.line}>
                        <Picturecard picture={require("../assets/rouge.png")} text="idée du jour: Recevoir un mail quand il pleut" textcolor="black" />
                        <Picturecard picture={require("../assets/net.png")} text="Nombre ami: 12" textcolor="#ffffff" />
                    </View>
                    <Picturecard picture={require("../assets/vs.png")} text="Faite votre choix" textcolor="black" style={{ marginBottom: 20 }} />
                    <Datacard
                        title="Partage de vos reaction"
                        data="512"
                        icon="account-supervisor"
                        style={{ marginBottom: 20 }}
                    />
                </ScrollView>
            </MainContainer> */}
        </MainContainer>
    );
}

const styles = {
    line: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginBottom: 25,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        marginRight: 80,
        marginTop: -10
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
        marginTop: -10
    },
}

export default Dashboard;