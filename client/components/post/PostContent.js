import React, { useMemo } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import PropTypes from 'prop-types'

const PostContent = ({ img }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return useMemo(
    () => (
      <Wrap>
        <Slider {...settings}>
          {img.map(v => (
            <img src={`http://localhost:3065/${v.src}`} alt="게시물이미지" key={v.id} />
          ))}
        </Slider>
      </Wrap>
    ),
    [img],
  )
}

PostContent.propTypes = {
  img: PropTypes.string.isRequired,
}

const Wrap = styled.div`
  width: inherit;
  height: inherit;

  & * {
    height: inherit;
  }
  & img {
    width: inherit;
    max-height: 61.4rem;
  }

  & .slick-dots li {
    margin: 0;
    &.slick-active button:before {
      color: #3897f0;
      opacity: 1;
    }
  }
  & .slick-prev {
    left: 1rem;
    z-index: 1;
  }

  & .slick-next {
    right: 1rem;
    z-index: 1;
  }
`

export default PostContent
