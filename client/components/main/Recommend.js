import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Story = () => {
  const { image, userName } = useSelector(state => state.user.me)
  const recommendList = (list = [1, 2, 3]) => {
    return list.map(() => (
      <div className="recommend-item">
        <div className="user-image">
          <img src={`http://localhost:3065/${image.src}`} alt="프로필사진" />
        </div>
        <div className="user-info">
          <div className="user-name">{userName}</div>
          <div className="recommend-description">회원님을 팔로우합니다.</div>
        </div>
        <div className="follow">팔로우</div>
      </div>
    ))
  }
  return (
    <Wrap>
      <div className="recommend-header">
        <div className="section-title">회원님을 위한 추천</div>
        <span className="show-all">모두보기</span>
      </div>
      <div className="recommend-container">{recommendList()}</div>
    </Wrap>
  )
}

const Wrap = styled.div`
  .recommend-header {
    display: flex;
    justify-content: space-between;
    margin-top: 1.2rem;
    padding: 0.4rem 1.6rem;
    height: 1.1rem;

    & .section-title {
      font-size: 1.4rem;
      color: #999;
      line-height: 1.8rem;
    }
    & .show-all {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
  .recommend-container {
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
    padding: 0.8rem 0;
    box-sizing: border-box;
    height: 16rem;

    & .recommend-item {
      padding: 0.8rem 1.6rem;
      height: 3.2rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      & .user-image {
        width: 3.4rem;
        height: 3.4rem;
        & > img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      & .user-info {
        margin-left: 1.2rem;
        flex: 1 0 auto;
        & > .user-name {
          color: #262626;
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 1.8rem;
        }
        & > .recommend-description {
          margin-top: 0.3rem;
          font-size: 1.2rem;
          color: #999;
          font-weight: 400;
        }
      }

      & .follow {
        color: #3897f0;
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
  }
`

export default Story
