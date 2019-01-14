import React, { Component } from 'react';
import styled from 'styled-components';
import { ExploreIcon, ActivityIcon, ProfileIcon } from '../Icons.js'


class Accounts extends Component {
    render() {
        return (
            <AccountsWrap>
                <IconWrap>
                    <ExploreIcon />
                </IconWrap>
                <IconWrap>
                    <ActivityIcon />
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
    margin-left : 3rem;
`

export default Accounts;