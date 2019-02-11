import React from 'react';
import styled from 'styled-components';
import { SettingIcon } from '../../../../Icons'

const Settings = ({ index, isSettingForm }) => {
    return (
        <Wrap>
            <SettingIcon onClick={() => {
                isSettingForm(true, index)
            }} />
        </Wrap>
    );
};

const Wrap = styled.div`
    width : 4rem;
    height : 5.2rem;
    position : absolute;
    right : 0.4rem;
    bottom : -1rem;
`

export default Settings;