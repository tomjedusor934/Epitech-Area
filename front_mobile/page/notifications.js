import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, Button } from 'react-native';
import { colors } from '../component/colors.js';
import MainContainer from '../component/MainContainer.js';
import Bigtext from '../text/Bigtext.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Notifcard from '../component/notifcard.js';
import Topbar from '../component/topbg.js';
import NavBar from '../component/navBar/navBar.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Notifications() {
    const [myId, setMyId] = useState('');
    const [allNotif, setAllNotif] = useState([]);
    const [token, setToken] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    }

    const deleteNotif = (id) => {
        fetch(`https://api.area.tal-web.com/user/notification/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setAllNotif(allNotif.filter(notif => notif.id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const sortNotif = (tab) => {
        if (tab.length <= 1) {
            return tab;
        }

        const pivot = tab[0].created_at;
        const less = [];
        const equal = [];
        const greater = [];

        for (const element of tab) {
            if (element.created_at < pivot) {
                less.push(element);
            } else if (element.created_at === pivot) {
                equal.push(element);
            } else {
                greater.push(element);
            }
        }

        return [...sortNotif(greater), ...equal, ...sortNotif(less)];
    };

    useEffect(() => {
        if (!token) {
            return;
        }

        if (myId !== '') {
            const intervalId = setInterval(() => {
                fetch(`https://api.area.tal-web.com/user/notifications/${myId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                })
                    .then((response) => response.json())
                    .then((response) => {
                        console.log("test : ", response);
                        setAllNotif(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [myId, token]);

    useEffect(() => {
        AsyncStorage.getItem('token', (err, value) => {
            if (value !== null) {
                setToken(value);
            }
        });

        AsyncStorage.getItem('id', (err, value) => {
            if (value !== null) {
                setMyId(value);
                console.log('myId:', value);
            }
        });
    }, []);

    const { accent } = colors; // Moved it here

    return (
        <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
            <Topbar />
            <NavBar />
            <MainContainer style={{ backgroundColor: 'rgb(245, 245, 245)', marginBottom: -40 }}>
                <View style={styles.line}>
                    <Bigtext style={styles.text}>Notifications</Bigtext>
                    <MaterialCommunityIcons name={"bell"} size={50} color={'black'} style={styles.image} />
                </View>
                <ScrollView>
                    {sortNotif(allNotif).map((notif, index) => {

                        return (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: '#ffffff',
                                    width: 350,
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    marginLeft: 10,
                                    marginRight: 30,
                                    marginTop: 10,
                                    padding: 10,
                                    borderTopWidth: 5,
                                    borderColor: 'red',
                                }}
                            >
                                <Text>
                                    {notif.title}
                                </Text>

                                <Text>
                                    {notif.message}
                                </Text>

                                <Text>
                                    {formatDate(notif.created_at)}
                                </Text>

                                <Button
                                    title="Supprimer"
                                    onPress={() => deleteNotif(notif.id)}
                                />
                            </View>
                        );
                    }
                    )}
                </ScrollView>
            </MainContainer>
        </MainContainer>
    );
}

const styles = {
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        top: -40,
        marginBottom: -40,
    },
    text: {
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        paddingTop: 30,
        // marginRight: 50,
        // marginTop: -10
    },
    image: {
        // position: 'absolute',
        // top: -20,
        // left: 240,
        // width: 100,
        // height: 100,
    },
}

export default Notifications;
