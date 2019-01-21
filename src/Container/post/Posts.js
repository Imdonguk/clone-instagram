import React, { Component } from 'react';
import styled from 'styled-components';
import Post from './Post.js'
class Posts extends Component {

    render() {
        return (
            <PostWrap>
                <Post />
                <Post />
                <Post />
                <Post />
            </PostWrap>
        );
    }
}

const PostWrap = styled.div`
    max-width : 61.4rem;
    margin-right : 2.8rem;
    box-sizing : border-box;
`

export default Posts;