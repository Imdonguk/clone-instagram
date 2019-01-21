import React, { Component } from 'react';
import Logo from './Logo'
import Input from './Input'
import Accounts from './Accounts'
import styled from 'styled-components';

class Header extends Component {
    render() {
        return (
            <HeaderWrap>
                <Content>
                    <Logo></Logo>
                    <Input></Input>
                    <Accounts isPostForm={this.props.isPostForm}></Accounts>
                </Content>
            </HeaderWrap>
        );
    }
}

const HeaderWrap = styled.div`
    width : 100%;
    height : 7.7rem;
    display : flex;
    justify-content: center;
    border-bottom : 0.05rem solid #ddd;
    background-color : #fff;
`

const Content = styled.div`
    width : 101rem; 
    height : 100%;
    padding : 0 2rem;
    display : flex;
    align-items : center;
    box-sizing : border-box;
    justify-content : space-between;
`

export default Header;