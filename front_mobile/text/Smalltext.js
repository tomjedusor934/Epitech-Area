import React from 'react';

import styled from 'styled-components/native';
import {colors} from '../component/colors.js';

const {tertiary} = colors;

const StyledText = styled.Text`
    font-size: 13px;
    color: ${tertiary};
    text-align: left;
`;

const Smalltext = (props) => {
    return <StyledText {...props}>{props.children}</StyledText>;
};

export default Smalltext;