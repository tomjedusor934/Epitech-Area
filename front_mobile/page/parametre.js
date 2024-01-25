import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import MainContainer from '../component/MainContainer.js';
import Bigtext from '../text/Bigtext.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Topbar from '../component/topbg.js';
import NavBar from '../component/navBar/navBar.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function Parametre() {
    const navigation = useNavigation();
    const handleButtonClick = () => {
        navigation.navigate('Login');
        AsyncStorage.clear()
            .then(() => {
                console.log('AsyncStorage vidé avec succès.');
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la suppression d\'AsyncStorage :', error);
            });
    };
    return (
        <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
            <Topbar />
            <NavBar />
            <MainContainer style={{ backgroundColor: 'rgb(245, 245, 245)', marginBottom: -40 }}>
                <View style={styles.line}>
                    <Bigtext style={styles.text}>Paramètre</Bigtext>
                    <MaterialCommunityIcons name={"cog"} size={80} color={'black'} style={styles.image} />
                </View>

                <View
                    style={{
                        marginTop: 30,
                    }}
                >
                    <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
                        <Text style={styles.buttonText}>Déconnexion</Text>
                    </TouchableOpacity>
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
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
    },
}

export default Parametre;