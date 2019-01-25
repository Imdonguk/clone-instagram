import React, { Component } from 'react';
import styled from 'styled-components';
import Posts from './post/Posts'
import PostForm from './PostForm'

class Container extends Component {

    state = {
        'information': [

        ]
    }

    addPost = (info) => {
        const { information } = this.state
        this.setState({
            'information': information.concat(info)
        })
    }

    render() {
        const { bePostForm } = this.props;
        return (
            <MainWrap>
                <Main>
                    <Posts info={this.state.information} />
                    {
                        bePostForm ?
                            <PostForm
                                isPostForm={this.props.isPostForm}
                                addPost={this.addPost}
                            /> : ''
                    }
                </Main>
            </MainWrap>
        );
    }
}

const MainWrap = styled.div`
    position : relative;
    background-color : #fafafa;
    width : 100%;
    display : flex;
    justify-content : center;
`

const Main = styled.div`
    width : 93.5rem;
    margin-top : 6rem;
`

export default Container;