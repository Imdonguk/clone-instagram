import React from 'react';
import styled from 'styled-components';
import Buttons from './buttons/Buttons';
import Likes from './Likes';
import ViewCommentList from './ViewCommentList';
import InputComment from './InputComment';

const Comment = ({ info, addComment, index }) => {
    return (
        <Wrap>
            <Buttons />
            <Likes />
            <ViewCommentList
                comments={info.comments}
            />
            <InputComment
                index={index}
                addComment={addComment}
            />
        </Wrap>
    );
}

const Wrap = styled.div`
    position : relative;
    padding : 0 1.6rem;
`
export default Comment;