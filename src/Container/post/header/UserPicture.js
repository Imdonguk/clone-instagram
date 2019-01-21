import React from 'react';
import styled from 'styled-components';

const UserPicture = () => {
    return (
        <Wrap>
            <Picture src="https://scontent-icn1-1.cdninstagram.com/vp/4f943c355fb63bb8b3fb4045a82d826c/5CD5E86C/t51.2885-19/s320x320/19955689_1836156783365377_7651439866516865024_a.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com" />
        </Wrap>
    );
};

const Wrap = styled.div`
    width : 3rem;
    height : 3rem;
`
const Picture = styled.img`
    width : 100%;
    height : 100%;
    border-radius : 50%;
`
export default UserPicture;