import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './header/Header'
import Content from './content/Content'
import Comment from './comment/Comment'
import Settings from './settings/Settings'

import _ from 'lodash'

class Post extends Component {

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.info, this.props.info);
    }

    render() {
        const { info, addComment, index, isSettingForm } = this.props
        return (
            <Wrap>
                <Header />
                <Content
                    img={info.img}
                />
                <Comment
                    info={info}
                    addComment={addComment}
                    index={index}
                />
                <Settings
                    isSettingForm={isSettingForm}
                    index={index}
                />
            </Wrap>
        );
    }
}

const Wrap = styled.div`
    position : relative;
    width : 100%;
    border : 0.1rem solid #e6e6e6;
    background-color : #fff;
    margin-bottom : 6rem;
`

export default Post;