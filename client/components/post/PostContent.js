import React, { useMemo } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

const PostContent = ({ images }) => {
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
          {images.map(v => (
            <img src={`http://localhost:3065/${v.src}`} alt="게시물이미지" key={v.id} />
          ))}
        </Slider>
      </Wrap>
    ),
    [images],
  )
}

const Wrap = styled.div`
  width: inherit;
  height: inherit;
  box-sizing: border-box;

  & div {
    height: inherit;
  }
  & img {
    max-height: 61.4rem;
    object-fit: cover;
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

  & .slick-track {
    display: flex;
    align-items: center;
  }
`

export default PostContent
