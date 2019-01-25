import React from 'react';
import styled from 'styled-components';

const InputComment = () => {
    return (
        <Wrap>
            <Input placeholder='댓글달기...' />
        </Wrap>
    );
};

const Wrap = styled.div`
    height : 5.6rem;
    border-top : 0.1rem solid #e6e6e6;
    display : flex;
    align-items : center;
`

const Input = styled.input`
    outline : none;
    border : 0;
    width : 100%;
    height : 1.8rem;
    font-size : 1.4rem;
`

export default InputComment;