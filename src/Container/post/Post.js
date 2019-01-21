import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './header/Header'
import Content from './content/Content'
import Comment from './comment/Comment'

class Post extends Component {
    render() {
        return (
            <Wrap>
                <Header></Header>
                <Content></Content>
                <Comment></Comment>
            </Wrap>
        );
    }
}

const Wrap = styled.div`
    width : 100%;
    border : 0.1rem solid #e6e6e6;
    background-color : #fff;
    margin-bottom : 6rem;
`

export default Post;