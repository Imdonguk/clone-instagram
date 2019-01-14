import React, { Component } from 'react';
import styled from 'styled-components';
class Container extends Component {
    render() {
        return (
            <MainWrap>
                <Main></Main>
            </MainWrap>
        );
    }
}

const MainWrap = styled.div`
    background-color : #fafafa;
    width : 100%;
    height : 100rem;
    display : flex;
    justify-content : center;
`

const Main = styled.div`
    width : 93.5rem;
    margin-top : 7rem;
`

export default Container;