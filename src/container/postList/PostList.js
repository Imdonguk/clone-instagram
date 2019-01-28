import React, { Component } from 'react';
import styled from 'styled-components';
import Post from './post/Post'
import PostForm from './postForm/PostForm'

class Posts extends Component {

    state = {
        information: []
    }

    index = this.state.information.length;

    addPost = (info) => {
        const { information } = this.state
        info = Object.assign({}, info, { id: this.index++ })
        this.setState({
            'information': information.concat(info)
        })
    }

    render() {
        const { bePostForm } = this.props;
        const { information } = this.state;
        const postList = information.map(info => (
            <Post
                info={info}
                key={info.id++}
            />
        ))
        return (
            <PostWrap>
                {postList}
                {bePostForm ?
                    <PostForm
                        isPostForm={this.props.isPostForm}
                        addPost={this.addPost}
                    /> : ''
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