import React, { Fragment } from 'react';
import styled from 'styled-components'

const ViewCommentList = function (index) {
    return ({ comments }) => {
        const commentList = comments.map(v => <ViewComment comment={v} key={index++} />)
        return (
            <Fragment>
                {commentList}
            </Fragment>
        )
    }
}(0)

const ViewComment = ({ comment }) => {
    return (
        <Wrap>
            <User>dungwookisgood</User>
            <span>{comment}</span>
        </Wrap>
    );
};

const Wrap = styled.div`
    width : 100%;
    font-size : 1.4rem;
    margin-bottom : 1rem;
`
const User = styled.span`
    margin-right : 0.5rem;
    font-weight : 800;
`

export default ViewCommentList;