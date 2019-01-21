import React, { Component } from 'react';
import styled from 'styled-components';
import { UploadIcon, ExploreIcon, LikeIcon, ProfileIcon } from '../Icons.js'

class Accounts extends Component {

    render() {
        return (
            <AccountsWrap>
                <IconWrap first>
                    <UploadIcon />
                </IconWrap>
                <IconWrap>
                    <ExploreIcon />
                </IconWrap>
                <IconWrap>
                    <LikeIcon />
                </IconWrap>
                <IconWrap>
                    <ProfileIcon />
                </IconWrap>
            </AccountsWrap>
        );
    }
}


const AccountsWrap = styled.div`
    display : flex;
    align-items : center;
    height : 100%;
`

const IconWrap = styled.div`
    width : 2.4rem;
    height : 2.4rem;
    margin-left : ${props => props.first ? 0 : '3rem'}
    cursor : pointer;
`

export default Accounts;