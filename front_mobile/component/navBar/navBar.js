import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NavBar() {
    const navigation = useNavigation();
    return (
        <View
            style={{
                width: '100%',
                height: 80,
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                zIndex: 10,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 80,
                    width: '90%',
                    marginLeft: '5.5%',
                    position: 'absolute',
                    zIndex: 100,
                    
                }}
            >
                <View
                    style={{
                        borderRadius: 50,
                        marginBottom: 10,
                    }}
                >
                    <MaterialCommunityIcons
                        name='account'
                        size={30}
                        color='black'
                        onPress={() => navigation.navigate('Profile')}
                    />
                </View>

                <View
                    style={{
                        borderRadius: 50,
                        marginBottom: 10,
                    }}
                >
                    <Entypo
                        name='list'
                        size={30}
                        color='black'
                        onPress={() => navigation.navigate('MesArea')}
                    />
                </View>

                <View
                    style={{
                        backgroundColor: 'blue',
                        borderRadius: 50,
                        bottom: 40,
                    }}

                >                    
                    <MaterialIcons
                        name='dashboard'
                        size={35}
                        color='white'
                        style={{
                            padding: 8,
                        }}

                        onPress={() => navigation.navigate('Dashboard')}
                    />
                </View>

                <View
                    style={{
                        borderRadius: 50,
                        marginBottom: 10,
                    }}
                >
                    <Ionicons
                        name='notifications'
                        size={30}
                        color='black'
                        
                        onPress={() => navigation.navigate('Notifications')}
                    />
                </View>

                <View
                    style={{
                        borderRadius: 50,
                        marginBottom: 10,
                    }}
                >
                    <Feather
                        name='settings'
                        size={30}
                        color='black'
                        
                        onPress={() => navigation.navigate('Parametre')}
                    />
                </View>
            </View>



            <View
                style={{
                    height: 80,
                    width: '100%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 1,
                    marginLeft: '-0.7%',
                }}
            >

                <View
                    style={{
                        height: 15,
                        width: 150,
                        backgroundColor: 'rgb(245, 245, 245)',
                        position: 'absolute',
                        bottom: 65,
                        left: '50%',
                        marginLeft: -70,
                    }}
                >
                </View>

                <View
                    style={{
                        height: 80,
                        width: 80,
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: 0,
                        left: 110,
                        borderTopRightRadius: 30,
                    }}
                >
                </View>

                <View
                    style={{
                        height: 80,
                        width: 80,
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: 0,
                        left: 235,
                        borderTopLeftRadius: 30,
                    }}
                >
                </View>

                <View
                    style={{
                        height: 60,
                        width: 60,
                        backgroundColor: 'rgb(245, 245, 245)',
                        position: 'absolute',
                        bottom: 49,
                        left: 182.5,
                        borderRadius: 40,
                    }}
                >
                </View>
            </View>

        </View>
    )
}