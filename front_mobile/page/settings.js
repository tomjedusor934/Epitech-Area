import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, StatusBar} from 'react-native';
import NavBar from '../component/navBar/navBar';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <NavBar />
    <StatusBar backgroundColor="black" barStyle="light-content" />
    <View style={styles.header}>
      <Text style={styles.headerText}>Support</Text>
      <View style={styles.bannerLeft}>
        <Text style={styles.bannerText}>
          Bienvenue sur la page de support de Reactify !
        </Text>
        <Text style={styles.bannerText}>
          Vous pouvez retrouver ici toutes les informations en lien avec le fonctionnement de l'application Reactify. Mais également la possibilité de nous contacter en cas de problème ou de question. Nous vous répondrons dans les plus brefs délais.
        </Text>
      </View>
    </View>

      <View style={styles.supportContent}>
        
        <View style={styles.headSupport}>
          <View style={styles.leftHeadSupport}>
            <Text style={styles.supportTitle}>
              Laissez Reactify s'en occuper
            </Text>
            <Text style={styles.supportText}>
              Avec Reactify, vous n'avez pas à vous soucier de vos rendez-vous ou des anniversaires de vos proches. Nous nous occupons d'envoyer des notifications pour vous !
            </Text>
          </View>

          <View style={styles.rightHeadSupport}>
            <View style={styles.semiBottom}>
              <Text style={styles.supportTitle}>
                Contactez le support !
              </Text>
              <Text style={styles.supportText}>
                Vous avez une question ? Un problème ? N'hésitez pas à nous contacter. Vous pouvez également nous contacter pour nous faire part de vos suggestions d'amélioration et pour nous faire part de vos retours.
              </Text>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => Linking.openURL('mailto:exemple@gmail.com')}
              >
                <Text style={styles.contactButtonText}>Nous contacter</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.semiHead}>
              <Text style={styles.supportTitle}>
                Profitez de votre temps libre !
              </Text>
              <Text style={styles.supportText}>
                Créez une A/rea pour gérer les rendez-vous de votre entreprise.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

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
  bannerLeft: {},
  bannerText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  supportContent: {
    padding: 20,
  },
  headSupport: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftHeadSupport: {
    flex: 1,
  },
  rightHeadSupport: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  supportText: {
    fontSize: 16,
    marginBottom: 10,
  },
  semiBottom: {},
  semiHead: {
    marginTop: 20,
  },
  contactButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
