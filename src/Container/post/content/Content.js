import React, { Component } from 'react';
import styled from 'styled-components'
class Content extends Component {
    render() {
        return (
            <Wrap>
                <Woogie src="https://scontent-icn1-1.cdninstagram.com/vp/b5157ba226db2183493d5a7fbdf13157/5D00E42D/t51.2885-15/e35/47693856_362371887929098_655068975513700593_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com" alt="우기" />
            </Wrap>
        );
    }
}

const Wrap = styled.div`
    position : relative;
    background-color : #fff;
`

const Woogie = styled.img`
    width : 100%;
`

export default Content;