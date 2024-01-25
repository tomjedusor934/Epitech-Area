import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Profile from './page/profile.js';
import Parametre from './page/parametre.js';
import Dashboard from './page/dashboard.js';
import Notifications from './page/notifications.js';
import MesArea from './page/mesArea.js';
import Login from './page/login.js';

import NavBar from './component/navBar/navBar.js';

const Stack = createStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [initialRouteName, setInitialRouteName] = useState('Login');


    useEffect(() => {
        AsyncStorage.clear();
        // Vérifiez si un token est présent dans AsyncStorage
        AsyncStorage.getItem('token')
            .then(token => {
                if (token !== null) {
                    console.log("token: ", token)
                    console.log('route de base : Dashboard');
                    setInitialRouteName('Login');
                } else {
                    console.log('route de base : login');
                    setInitialRouteName('Dashboard');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du token:', error);
            });

        console.log('Initial route name:', initialRouteName)
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MesArea"
                    component={MesArea}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Parametre"
                    component={Parametre}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
