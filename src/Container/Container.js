import React, { Component } from 'react';
import styled from 'styled-components';
import Posts from './post/Posts'
import PostForm from './PostForm'

class Container extends Component {

    render() {
        const { bePostForm } = this.props;
        return (
            <MainWrap>
                <Main>
                    <Posts />
                    {
                        bePostForm ? <PostForm isPostForm={this.props.isPostForm} /> : ''
                    }
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