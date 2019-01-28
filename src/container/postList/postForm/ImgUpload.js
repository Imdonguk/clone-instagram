import React, { Component } from 'react';
import styled from 'styled-components';
import imageIcon from '../../../images/gallery-icon.png'

class ImgUpload extends Component {

    handleUpload = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.props.onUpload(reader.result)
        }
        reader.readAsDataURL(file)
    }

    render() {
        return (
            <Wrap>
                <Icon src={imageIcon} />
                <UploadText>이미지업로드</UploadText>
                <Upload
                    type="file"
                    onChange={this.handleUpload}
                />
            </Wrap>
        );
    }
}

const Wrap = styled.div`
    position : relative;
    flex : 1;
    height : 100%;
    background-color : #fff;
    text-align : center;
`

const Icon = styled.img`
    width : 80%;
    cursor : pointer;
`

const UploadText = styled.p`
    font-size : 1.4rem;
    color : #bbb;
`

const Upload = styled.input`
    position : absolute;
    left : 0;
    top : 0;
    width : 100%;
    height : 100%;
    opacity : 0;
    cursor : pointer;
`
export default ImgUpload;