import React, { Component } from 'react';
import styled from 'styled-components';
import PostList from './postList/PostList'

class Container extends Component {

    render() {
        const { bePostForm, isPostForm } = this.props;
        return (
            <MainWrap>
                <Main>
                    <PostList
                        bePostForm={bePostForm}
                        isPostForm={isPostForm}
                    />
                </Main>
            </MainWrap>
        );
    }
}

const MainWrap = styled.div`
    position : relative;
    background-color : #fafafa;
    width : 100%;
    display : flex;
    justify-content : center;
`

const Main = styled.div`
    width : 93.5rem;
    margin-top : 6rem;
`

export default Container;