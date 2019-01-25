import React from 'react';
import styled from 'styled-components'

const Likes = (props) => {
    return (
        <Wrap>
            <LikesCount>좋아요 26개</LikesCount>
        </Wrap>
    );
};

const Wrap = styled.div`
    width : 100%;
    height : 1.8rem;
    margin-bottom : 0.8rem;
`

const LikesCount = styled.span`
    font-weight : 600;
    color: #262626;
    font-size : 1.4rem;
`

export default Likes;