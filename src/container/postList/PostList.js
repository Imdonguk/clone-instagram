import React, { Component } from 'react';
import styled from 'styled-components';
import Post from './post/Post'
import PostForm from './postForm/PostForm'
import _ from 'lodash'

class PostList extends Component {

    state = {
        information: [],
        beSettingForm: false,
        postNo: null
    }

    isSettingForm = (data, index = this.state.postNo) => {
        this.setState({
            ...this.state,
            beSettingForm: data,
            postNo: index
        })
    }

    editPost = (editInfo) => {
        const { information, postNo } = this.state;
        editInfo = Object.assign({}, editInfo)
        this.setState({
            ...this.state,
            information: information.map((v, i) => postNo === i ? editInfo : v),
            postNo: null
        })
    }

    addPost = (newInfo) => {
        const { information } = this.state
        newInfo = Object.assign({}, newInfo)
        this.setState({
            ...this.state,
            'information': information.concat(newInfo)
        })
    }

    addComment = (id, comment) => {
        const newState = _.cloneDeep(this.state);
        newState.information[id].comments.push(comment);
        this.setState(newState);
    }

    render() {
        const { bePostForm } = this.props;
        const { information } = this.state;
        const postList = information.map((info, idx) => (
            <Post
                info={info}
                key={idx}
                index={idx}
                addComment={this.addComment}
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

export default PostList;