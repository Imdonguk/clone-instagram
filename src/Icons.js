import styled from 'styled-components';
import coreImg from './images/sprite_core.png'
import glyphsImg from './images/sprite_glyphs.png'

export const BasicIcon = styled.span`
    background-image : url(${glyphsImg});
    width: 2.4rem;
    height: 2.4rem;
    background-size: 26.0rem 21.1rem;
    background-repeat : no-repeat;
    display : inline-block;
`

export const IconLogo = styled(BasicIcon)`
    background-position: -6.2rem -10.6rem;
`

export const LetterLogo = styled(BasicIcon)`
    width : 10.3rem;
    height : 2.9rem;
    margin-top : 0.7rem;
    background-position : -5.7rem 0;
`

export const SearchIcon = styled(BasicIcon)`
    width : 1rem;
    height : 1rem;
    background-image : url(${coreImg});
    background-size: 41.2rem 39.6rem;
    background-position: -40rem -4.8rem;
`

export const ExploreIcon = styled(BasicIcon)`
    background-position: -21.1rem 0;
`

export const LikeIcon = styled(BasicIcon)`
    background-position: -2.5rem -13.7rem;
`

export const ProfileIcon = styled(BasicIcon)` 
    background-position: -12.5rem -18.7rem;
`

export const ShareIcon = styled(BasicIcon)`
    background-position: -5rem -18.7rem;
`

export const CommentIcon = styled(BasicIcon)`
    background-position: -10.7rem -3rem;
`

export const SaveIcon = styled(BasicIcon)`
    background-position: -21.1rem -10rem;
`

export const UploadIcon = styled(BasicIcon)`
    background-position: -5rem -16.2rem;
`