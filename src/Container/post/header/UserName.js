import React, { Component } from 'react';
import styled from 'styled-components';

class UserName extends Component {
    render() {
        return (
            <Wrap>
                <Name href="dungwoogkisgood">dungwookisgood</Name>
            </Wrap>
        );
    }
}

const Wrap = styled.div`
    display : flex;
    height : 1.8rem;
    align-items : center;
    margin-left : 1.2rem;

`
const Name = styled.a`
    font-size : 1.4rem;
    font-weight : 600;
    text-decoration : none;
    color : #000;
`

export default UserName;