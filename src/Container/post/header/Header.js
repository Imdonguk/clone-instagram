import React from 'react';
import styled from 'styled-components';
import UserName from './UserName';
import UserPicture from './UserPicture'

const Header = () => {
    return (
        <Wrap>
            <UserPicture />
            <UserName />
        </Wrap>
    );
};

const Wrap = styled.div`
    display : flex;
    align-items : center;
    width : 100%;
    height : 6rem;
    padding : 1.6rem;
    box-sizing : border-box;
`

export default Header;