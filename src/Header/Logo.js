import React from 'react';
import styled from 'styled-components';
import { IconLogo, LetterLogo } from '../Icons'

const Logo = () => {

    return (
        <LogoWrap href="#" >
            <IconLogo />
            <Boundary></Boundary>
            <LetterLogo />
        </LogoWrap >
    );
};

const LogoWrap = styled.a`
    display : block;
    width : 16rem;
    display : flex;
    align-items : center;
    height :5rem;
    background-color : #fff;
`

const Boundary = styled.div`
    width : .1rem;
    height : 2.8rem;
    background-color : #26262666;
    margin : 0 1.6rem;
`

export default Logo;