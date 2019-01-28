import React, { Component } from 'react';
import styled from 'styled-components'
class Content extends Component {
    render() {
        return (
            <Wrap>
                <PostContent src={this.props.img} alt="우기" />
            </Wrap>
        );
    }
}

const Wrap = styled.div`
    position : relative;
    background-color : #fff;
`

const PostContent = styled.img`
    width : 100%;
`

export default Content;