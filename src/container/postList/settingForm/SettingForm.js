import React from 'react';
import FormWrap from '../FormWrap'
import styled from 'styled-components'

const SettingForm = ({ isSettingForm, isPostForm, removePost, index }) => {
    return (
        <FormWrap onClick={(e) => {
            if (e && e.currentTarget !== e.target) return;
            isSettingForm(false, index)
        }}>
            <Wrap>
                <EditButton onClick={() => {
                    isSettingForm(false);
                    isPostForm(true)
                }}>수정하기</EditButton>
                <RemoveButton onClick={removePost}>제거하기</RemoveButton>
            </Wrap>
        </FormWrap>
    );
};

const Wrap = styled.div`
    width : 40rem;
    background-color : #fff;
    border-radius : 2rem;
`

const Button = styled.button`
    width : 100%;
    height : 7rem;
    font-size : 1.6rem;
    font-weight : 600;
    outline : none;
    cursor : pointer;
`

const EditButton = styled(Button)`
    color : #3897f0;
    border-top-left-radius : 2rem
    border-top-right-radius : 2rem
`

const RemoveButton = styled(Button)`
    color : #ed4956;
    border-bottom-left-radius : 2rem
    border-bottom-right-radius : 2rem
`


export default SettingForm;