import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styled from 'styled-components/native';
import {colors} from './colors.js';
import { ScreenHeight } from './shared.js';

const {primary, secondary, black, accent} = colors;

import Regulartext from '../text/Regulartext.js';
import Smalltext from '../text/Smalltext.js';

const Cardstyle = styled.View`
    flex-direction: row;
    height: ${ScreenHeight * 0.2}px;
    width: 300px;
    background-color: ${primary};
    border-width: 2px;
    border-color: ${secondary};
    padding: 20px;
    border-radius: 15px;
    overflow: hidden;
    elevation: 5;
    shadow-color: ${black};
    shadow-radius: 4px;
    shadow-opacity: 0.25;
    shadow-offset: 0px 2px;
`;

const CardSection = styled.View`
    justify-content: space-between;
    align-items: flex-start;
`;

const Datacard = ({title, data, icon, color, ...props}) => {
    return(
        <Cardstyle style={{...props?.style}}>
            <CardSection style={{width: '60%'}}>
                <Regulartext style={{fontWeight: 'bold'}}>{title}</Regulartext>
                <Regulartext style={{fontSize: 25, fontWeight: 'bold'}}>{data}</Regulartext>
                <Smalltext>View details</Smalltext>
            </CardSection>
            <CardSection style={{width: '40%'}}>
                <MaterialCommunityIcons name={icon} size={ScreenHeight * 0.13} color={color ? color : accent} />
            </CardSection>
        </Cardstyle>
    );
};

export default Datacard;