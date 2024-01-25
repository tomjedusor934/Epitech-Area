import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordIcon, setShowPasswordIcon] = useState(
        <AntDesign name="eye" style={{ height: 35, width: 35 }} />
    );

    const modifyShowPassword = () => {
        setShowPassword(!showPassword);

        if (showPassword) {
            setShowPasswordIcon(
                <Entypo name="eye-with-line" style={{ height: 35, width: 35 }} />
            );
        } else {
            setShowPasswordIcon(<AntDesign name="eye" style={{ height: 35, width: 35 }} />);
        }
    };

    const handleUsername = (text) => {
        setUsername(text);
    };

    const handlePassword = (text) => {
        setPassword(text);
    };

    const checkLogin = () => {
        fetch('https://api.area.tal-web.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(async (response) => {
                try {
                    await AsyncStorage.setItem('token', response.headers.get('x-access-token'));
                    await AsyncStorage.setItem('username', username);
                    await AsyncStorage.setItem('isLogged', 'true');
                    await AsyncStorage.setItem('id', response.headers.get('id'));
                    console.log('Token enregistré avec succès dans AsyncStorage.');
                    navigation.navigate('Dashboard');
                } catch (error) {
                    console.error('Erreur lors de l\'enregistrement du token dans AsyncStorage:', error);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login</Text>
            <Text>Welcome back! Please login to your account.</Text>

            <TextInput
                style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
                placeholder="Email"
                value={username}
                onChangeText={(text) => handleUsername(text)}
            />

            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={{ width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }}
                    secureTextEntry={!showPassword}
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(text) => handlePassword(text)}
                />
                <TouchableOpacity onPress={modifyShowPassword}>
                    {showPasswordIcon}
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={checkLogin}>
                <Text>Login</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Remember me</Text>
                </View>

                <TouchableOpacity onPress={() => { }}>
                    <Text>Pas encore de compte ?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
