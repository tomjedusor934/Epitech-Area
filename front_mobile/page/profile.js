import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import MainContainer from '../component/MainContainer.js';
import Bigtext from '../text/Bigtext.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Topbar from '../component/topbg.js';
import NavBar from '../component/navBar/navBar.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Profil() {

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
            <Topbar />
            <NavBar />
            <MainContainer style={{ backgroundColor: 'rgb(245, 245, 245)', marginBottom: -40 }}>
                <View style={styles.line}>
                    <Bigtext style={styles.text}>Profil</Bigtext>
                    <MaterialCommunityIcons name={"account"} size={80} color={'black'} style={styles.image} />
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '90%',
                        height: '60%',
                        borderRadius: 10,
                        padding: 20,
                        margin: 20,
                        marginTop: 0,
                        marginBottom: 0,
                        alignItems: 'center',
                        marginTop: 50,
                    }}
                >
                    <Text
                        style={{
                            marginBottom: 30,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'left',
                            fontSize: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        Name: {data && data.name}
                    </Text>
                    <Text
                        style={{
                            marginBottom: 30,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'left',
                            fontSize: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        Surname: {data && data.surname}
                    </Text>
                    <Text
                        style={{
                            marginBottom: 30,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'left',
                            fontSize: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        Birth date: {data && formatDate(data.birth_date)}
                    </Text>
                    <Text
                        style={{
                            marginBottom: 30,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'left',
                            fontSize: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        Sexe: {data && data.sexe}
                    </Text>
                    <Text
                        style={{
                            marginBottom: 30,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'left',
                            fontSize: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        Post: {data && data.role}
                    </Text>
                </View>
            </MainContainer>
        </MainContainer>
    );
}

const styles = {
    line: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        marginRight: 50,
        marginTop: -10
    },
    image: {
        position: 'absolute',
        top: -20,
        left: 240,
        width: 100,
        height: 100,
    },
}
export default Profil;