import React from 'react';
import styled from 'styled-components/native';
import {StatusBarHeight} from './shared.js';
import {colors} from './colors.js';

const {primary} = colors;

const StyledView = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};
`;

const MainContainer = (props) => {
    return <StyledView {...props}>{props.children}</StyledView>;
};

export default MainContainer;