import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../component/colors.js';
import { ScreenHeight } from '../component/shared.js';

const {darkGray} = colors;

const Topbg = styled.View`
  background-color: ${darkGray};
    width: 100%;
    height: ${ScreenHeight * 0.3}px;
    borderRadius: 30px;
    position: absolute;
    top: -30px;
`;

const Topbar = (props) => {
    return <Topbg {...props}>{props.children}</Topbg>;
};

export default Topbar;