import React from 'react';

import styled from 'styled-components/native';
import {colors} from '../component/colors.js';

const {tertiary} = colors;

const StyledText = styled.Text`
    font-size: 30px;
    color: ${tertiary};
    text-align: center;
`;

const Bigtext = (props) => {
    return <StyledText {...props}>{props.children}</StyledText>;
};

export default Bigtext;