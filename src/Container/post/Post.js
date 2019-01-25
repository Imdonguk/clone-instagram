import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './header/Header'
import Content from './content/Content'
import Comment from './comment/Comment'

class Post extends Component {
    render() {
        const { info } = this.props;
        return (
            <Wrap>
                <Header></Header>
                <Content img={info.img}></Content>
                <Comment comment={info.comment}></Comment>
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