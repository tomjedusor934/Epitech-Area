import React from 'react';
import { View, ScrollView, Image} from 'react-native';
import MainContainer from '../component/MainContainer.js';
import Bigtext from '../text/Bigtext.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Topbar from '../component/topbg.js';
import NavBar from '../component/navBar/navBar.js';

function MesArea() {
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}}>
      <Topbar />
      <NavBar />
      <MainContainer style={{backgroundColor: 'rgb(245, 245, 245)', marginBottom: -40}}>
        <View style={styles.line}>
          <Bigtext style={styles.text}>Mes Area</Bigtext>
          <MaterialCommunityIcons name={"format-list-bulleted"} size={80} color={'black'} style={styles.image}/>
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
  text : {
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

export default MesArea;
