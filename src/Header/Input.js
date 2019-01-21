import React, { Component } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../Icons.js'

class Input extends Component {
    render() {
        return (
            <div>
                <InputWrap>
                    <Search type="text" placeholder="검색"></Search>
                    <SearchIconWrap>
                        <SearchIcon></SearchIcon>
                    </SearchIconWrap>
                </InputWrap>
            </div>
        );
    }
}

const InputWrap = styled.div`
    position : relative;
`

const Search = styled.input`
    font-size: 1.4rem;
    padding-left : 2.5rem;
    width: 18rem;
    height: 2rem;
    outline : none;
`
const SearchIconWrap = styled.div`
    position : absolute;
    left : 0;
    top : 0;
    width : 3rem;
    height :100%;
    display : flex;
    justify-content : center;
    align-items : center;
`

export default Input;