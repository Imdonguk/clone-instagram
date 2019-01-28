import React from 'react';
import styled from 'styled-components'

const ViewComment = (props) => {
    return (
        <Wrap>
            <User>dungwookisgood</User>
            <span>{props.comment}</span>
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

export default ViewComment;