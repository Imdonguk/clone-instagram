import React, { Component } from 'react';
import styled from 'styled-components';
import LikeBtn from './LikeBtn';
import CommentBtn from './CommentBtn';
import ShareBtn from './ShareBtn';
import SaveBtn from './SaveBtn';

class Buttons extends Component {
    render() {
        return (
            <Wrap>
                <BtnWrap first>
                    <LikeBtn />
                </BtnWrap>
                <BtnWrap>
                    <CommentBtn />
                </BtnWrap>
                <BtnWrap>
                    <ShareBtn />
                </BtnWrap>
                <BtnWrap last>
                    <SaveBtn />
                </BtnWrap>
            </Wrap>
        );
    }
}

const Wrap = styled.div`
    margin-top : 0.4rem;
    position: relative;
    height : 4rem;
    display : flex;
`

const BtnWrap = styled.div`
    width : 4rem;
    height : 4rem;
    display : flex;
    align-items : center;
    justify-content: center;
    margin-left : ${props => props.first ? '-0.8rem' : props.last ? 'auto' : '0'}
    margin-right : ${props => props.last ? '-1rem' : '0'}
`

export default Buttons;