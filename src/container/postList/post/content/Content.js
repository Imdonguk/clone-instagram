import React, { Component } from 'react';
import styled from 'styled-components'
import heart from '../../../../images/heart.png'

class Content extends Component {

    state = {
        value: false,
    }

    delayTime = 1000

    handleClick = () => {
        this.setState({ value: true })
    }

    componentDidUpdate() {
        if (this.state.value) {
            setTimeout(() => {
                this.setState({ value: false })
            }, this.delayTime)
        }
    }

    render() {
        return (
            <Wrap onDoubleClick={this.handleClick}>
                <PostContent src={this.props.img} alt="우기" />
                <Heart src={heart} isVisible={this.state.value} />
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

const Heart = styled.img`
    position: absolute;
    width: ${props => props.isVisible ? '9.2rem' : '0'}
    height: ${props => props.isVisible ? '8.1rem' : '0'}
    opacity : ${props => props.isVisible ? '1' : '0'}
    left: 50%;
    top : 50%;
    transform : translateX(-50%) translateY(-50%);
    transition: 0.2s all
`

export default Content;