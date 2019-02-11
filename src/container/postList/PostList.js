import React, { Component } from 'react';
import styled from 'styled-components';
import Post from './post/Post'
import PostForm from './postForm/PostForm'
import SettingForm from './settingForm/SettingForm'
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

    removePost = () => {
        const { information, postNo } = this.state;
        this.setState({
            ...this.state,
            information: information.filter((v, i) => postNo !== i),
            postNo: null,
            beSettingForm: false
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
        const { bePostForm, isPostForm } = this.props;
        const { information, beSettingForm, postNo } = this.state;
        const postList = information.map((info, idx) => (
            <Post
                info={info}
                key={idx}
                index={idx}
                addComment={this.addComment}
                isSettingForm={this.isSettingForm}
            />
        ))

        return (
            <PostWrap>
                {postList}
                {bePostForm && <PostForm
                    isPostForm={isPostForm}
                    addPost={this.addPost}
                    editPost={this.editPost}
                    mode={postNo || postNo === 0 ? 'edit' : 'add'}
                />}
                {beSettingForm && <SettingForm
                    isPostForm={isPostForm}
                    isSettingForm={this.isSettingForm}
                    removePost={this.removePost}
                />}
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