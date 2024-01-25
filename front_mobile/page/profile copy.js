import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ userInfo }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mon compte</Text>
      </View>

      <View style={styles.banner}>
        <View style={styles.profileInfo}>
          {/* <Image source={placeholderWoman} style={styles.profileImage} /> */}
          {/* <Text style={styles.profileName}>{userInfo.name + ' ' + userInfo.surname}</Text> */}
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Ionicons name="business" size={24} color="black" />
            <Text style={styles.infoText}>106 rue des marchés Nancy</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call" size={24} color="black" />
            <Text style={styles.infoText}>+33 6 33 58 96 75</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="mail" size={24} color="black" />
            <Text style={styles.infoText}>tom.jedusor@gmail.com</Text>
          </View>
        </View>
        <View style={styles.bannerTopMiddle}>
        <View style={styles.bannerMiddleHead}>
    <Text style={styles.middleHeaderText}>Informations personnelles</Text>
  </View>

  <View style={styles.listInfoPerso}>
    <InfoItem title="Nom" value="Herveux" />
    <InfoItem title="Prénom" value="Raccoon" />
    <InfoItem title="Date de naissance" value="34/3/222" />
    <InfoItem title="Genre" value="RTX4090TI" />
    <InfoItem title="Mot de passe" value="**********" />
    <TouchableOpacity>
      <Ionicons name="create" size={40} color="black" />
    </TouchableOpacity>
  </View>
</View>
        <View style={styles.infoItem}>
          {/* <Text style={styles.infoText}>{formatDate(userInfo.birth_date)}</Text> */}
        </View>
        <View style={styles.infoItem}>
          {/* <Text style={styles.infoText}>{userInfo.sexe}</Text> */}
        </View>

        {/* <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create" size={40} color="black" />
        </TouchableOpacity> */}

        <View style={styles.logoutContainer}>
          {/* <Text style={styles.logoutText}>Se déconnecter</Text> */}
          <Text style={styles.infoCircleText}>
            <Ionicons name="information-circle" size={20} color="black" />
            Veuillez prendre note que lorsque vous vous déconnectez, vos A/rea seront encore actives et vous recevrez un email à chaque notification reçue sur Reactify.
          </Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              // Gérer la déconnexion ici
            }}
          >
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dataUsageContainer}>
        <Text style={styles.bottomHeaderText}>Utilisation des données</Text>
        <Text style={styles.dataUsageText}>
          Reactify vous permet de créer vos propres A/rea et de les partager. Vos Informations personnelles sont importantes pour nous afin de vous proposer une expérience unique ! Elles ne seront jamais partagées à des tiers. Rendez-vous dans la section support afin de nous contacter si vous avez des questions ou pour nous faire part de vos suggestions !
        </Text>
      </View>
    </ScrollView>
  );
}

const InfoItem = ({ title, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.grey}>{title}</Text>
    <Text style={styles.infoText}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'black',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  banner: {
    padding: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoList: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  editButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoutContainer: {
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoCircleText: {
    fontSize: 14,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataUsageContainer: {
    marginTop: 20,
  },
  bottomHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataUsageText: {
    fontSize: 14,
    marginTop: 10,
  },
});