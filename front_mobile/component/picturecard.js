import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import styled from 'styled-components/native';
import {colors} from './colors.js';
import { ScreenHeight } from './shared.js';

const {primary, secondary, black, accent} = colors;

import Regulartext from '../text/Regulartext.js';

const Cardstyle = styled.View`
    flex-direction: row;
    height: ${ScreenHeight * 0.13}px;
    width: 140px;
    background-color: ${primary};
    border-width: 2px;
    border-color: ${secondary};
    border-radius: 15px;
    overflow: hidden;
    elevation: 5;
    shadow-color: ${black};
    shadow-radius: 4px;
    shadow-opacity: 0.25;
    shadow-offset: 0px 2px;
    marginRight: 20px;
    marginBottom: 10px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

const Picturecard = ({picture, text, textcolor, ...props}) => {
    return(
        <Cardstyle style={{...props?.style}}>
            <ImageBackground source={picture} style={styles.image}>
                <Regulartext style={{fontWeight: 'bold', color: textcolor, marginTop: 20}}>{text}</Regulartext>
            </ImageBackground>
        </Cardstyle>
    );
};


export default Picturecard;