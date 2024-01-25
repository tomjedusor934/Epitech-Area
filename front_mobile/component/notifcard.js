import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { View } from 'react-native';
import styled from 'styled-components/native';
import {colors} from './colors.js';
import { ScreenHeight } from './shared.js';

const {primary, secondary, black, accent} = colors;

import Regulartext from '../text/Regulartext.js';

const Cardstyle = styled.View`
    flex-direction: row;
    height: ${ScreenHeight * 0.1}px;
    width: 300px;
    background-color: ${primary};
    border-width: 2px;
    border-color: ${secondary};
    padding: 10px;
    border-radius: 15px;
    overflow: hidden;
    elevation: 5;
    shadow-color: ${black};
    shadow-radius: 4px;
    shadow-opacity: 0.25;
    shadow-offset: 0px 2px;
    marginBottom: 20px;
`;

const CardSection = styled.View`
    align-items: flex-start;
    justifyContent: 'center';
`;

const Notifcard = ({text, icon, color, ...props}) => {
    return(
        <Cardstyle style={{...props?.style}}>
            <CardSection style={{width: '25%'}}>
                <MaterialCommunityIcons name={icon} size={ScreenHeight * 0.08} color={color ? color : accent} />
            </CardSection>
            <View style={styles.container}>
                <Regulartext style={{fontWeight: 'bold'}}>{text}</Regulartext>
            </View>
        </Cardstyle>
    );
};

  const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
      },
    }
export default Notifcard;