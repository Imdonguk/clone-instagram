import React, { Component } from 'react';
import styled from 'styled-components'
import FormWrap from '../FormWrap'
import ImgUpload from './ImgUpload'
class PostForm extends Component {

    state = { img: '' }
    firstComment = ''

    cancleForm = (e) => {
        if (e && e.currentTarget !== e.target) return;
        this.props.isPostForm(false);
    }

    handleChange = ({ target }) => {
        this.firstComment = target.value;
    }

    handleUpload = (imageUrl) => {
        this.setState({ img: imageUrl })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { img } = this.state;
        const { addPost, editPost, mode } = this.props;
        const info = { img, comments: new Array(this.firstComment) };
        mode === 'edit' ? editPost(info) : addPost(info);
        this.cancleForm(e)
    }

    render() {
        return (
            <FormWrap onClick={this.cancleForm}>
                <Form onSubmit={this.handleSubmit}>
                    <ContentWrap header>
                        <h2>새로운 게시물</h2>
                    </ContentWrap>
                    <ContentWrap container>
                        {
                            this.state.img ?
                                <PreviewImg src={this.state.img} /> :
                                <ImgUpload onUpload={this.handleUpload} />
                        }
                        <RichText placeholder="설명입력...." onChange={this.handleChange} />
                    </ContentWrap>
                    <ContentWrap bottom>
                        <Button onClick={this.cancleForm}>닫기</Button>
                        <Button type='submit'>업로드</Button>
                    </ContentWrap>
                </Form>
            </FormWrap>
        );
    }
}

const Form = styled.form`
    width : 50rem;
    height : 30rem;
    border-radius : 2rem;
    background-color : #fff;
    box-sizing : border-box;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`

const ContentWrap = styled.div`
    width : 100%;
    height : ${props => props.container ? '60%' : '20%'}
    border-bottom : ${props => props.bottom ? 0 : '0.1rem solid #eee'}
    padding : ${props => props.container ? '3rem 3rem' : '0 3rem'}
    box-sizing : border-box;
    display : flex;
    align-items : center;
    justify-content : ${props => props.bottom ? 'space-between' : 'center'}
    font-size : ${props => props.header ? '2rem' : 0}
    border - top - left - radius : ${props => props.header ? '3rem' : 0}
    border - top - right - radius : ${props => props.header ? '3rem' : 0}
    border - bottom - left - radius : ${props => props.bottom ? '3rem' : 0}
    border - bottom - right - radius : ${props => props.bottom ? '3rem' : 0}
`

const PreviewImg = styled.img`
    flex : 1;
    height : 100%;
`

const RichText = styled.textarea`
    flex : 2;
    height : 100%;
    border : 0;
    padding : 1rem;
    font-size : 1.4rem;
    outline : none;
    resize : none;
`

const Button = styled.button`
    width: 5rem;
    height: 3rem;
    background-color : #999;
    cursor: pointer;
    color: #fff;
`

export default PostForm;