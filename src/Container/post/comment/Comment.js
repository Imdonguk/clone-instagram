import React, { Component } from 'react';
import styled from 'styled-components';
import Buttons from './buttons/Buttons';
import Likes from './Likes';
import ViewComment from './ViewComment';
import InputComment from './InputComment';

class Comment extends Component {
    render() {
        return (
            <Wrap>
                <Buttons />
                <Likes />
                <ViewComment />
                <InputComment />
            </Wrap>
        );
    }
}

const Wrap = styled.div`
    position : relative;
    padding : 0 1.6rem;
`
export default Comment;