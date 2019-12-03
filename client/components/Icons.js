import styled from 'styled-components'
import coreImg from '../images/sprite_core.png'
import glyphsImg from '../images/sprite_glyphs.png'
import glyphsImg2x from '../images/sprite_glyphs_2x.png'
import mediaImage from '../images/media.png'
import icons from '../images/icons.png'

export const BasicIcon = styled.span`
  background-image: url(${glyphsImg});
  width: 2.4rem;
  height: 2.4rem;
  background-size: 26rem 21.1rem;
  background-repeat: no-repeat;
  display: inline-block;
  cursor: pointer;
`

export const LogoIcon = styled(BasicIcon)`
  background-position: -6.2rem -10.6rem;
`

export const LetterIcon = styled(BasicIcon)`
  width: 10.3rem;
  height: 2.9rem;
  margin-top: 0.7rem;
  background-position: -5.7rem 0;
`

export const SearchIcon = styled(BasicIcon)`
  width: 1rem;
  height: 1rem;
  background-image: url(${coreImg});
  background-size: 41.2rem 39.6rem;
  background-position: -40rem -4.8rem;
`

export const ExploreIcon = styled(BasicIcon)`
  background-position: -21.1rem 0;
`

export const LikeIcon = styled(BasicIcon)`
  background-position-x: ${props => (props.like === true ? '0' : '-2.5rem')};
  background-position-y: -13.7rem;
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
  background-position-x: -21.1rem;
  background-position-y: ${({ save }) => (save ? '-2.4rem' : '-10rem')};
`

export const UploadIcon = styled(BasicIcon)`
  background-position: -5rem -16.2rem;
`

export const SettingIcon = styled(BasicIcon)`
  background-image: url(${glyphsImg2x});
  background-position: -4.5rem -16.55rem;
`

export const EditIcon = styled(SettingIcon)`
  background-position: -4.7rem -18.8rem;
`

export const PostIcon = styled(SearchIcon)`
  width: 1.2rem;
  height: 1.2rem;
  background-size: 41rem 39.6rem;
  background-position: -20.8rem -36.6rem;
`

export const WhiteLikeIcon = styled.span`
  width: 1.9rem;
  height: 1.9rem;
  background-image: url(${coreImg});
  background-size: 41rem 39.6rem;
  background-position: -37.6rem -23.3rem;
`

export const WhiteCommentIcon = styled(WhiteLikeIcon)`
  background-position: -37.6rem -27.5rem;
`

export const SlideIcon = styled.span`
  width: 3.2rem;
  height: 3.2rem;
  background-image: url(${mediaImage});
  background-size: 6.5rem 6.5rem;
  background-position: 0 0;
`

export const ViewMoreIcon = styled.span`
  width: 2.4rem;
  height: 2.4rem;
  background-image: url(${icons});
  background-size: 41.1rem 35.3rem;
  background-position: -28.1rem -22.3rem;
  cursor: pointer;
`
