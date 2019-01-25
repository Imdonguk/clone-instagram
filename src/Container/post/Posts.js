import React, { Component } from 'react';
import styled from 'styled-components';
import Post from '../post/Post'
class Posts extends Component {
    index = 0
    render() {
        return (
            <PostWrap>
                {
                    this.props.info.map(v => <Post info={v} key={this.index++} />)
                }
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