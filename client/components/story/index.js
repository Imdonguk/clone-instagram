import React from 'react'
import styled from 'styled-components'

const Index = () => {
  const storyList = (list = [1, 2, 3, 4, 5]) => {
    return list.map(() => (
      <div className="story-item">
        <button type="button">
          <div className="user-image">
            <img
              src="https://scontent-icn1-1.cdninstagram.com/vp/9246af266e3e74a8ccc79c2003b54947/5DFA1AB0/t51.2885-19/s150x150/30593507_198606810920786_1907780050036457472_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
              alt="프로필사진"
            />
          </div>
          <div className="user-info">
            <div className="user-name">woogieboogie</div>
            <div className="time">6시간전</div>
          </div>
        </button>
      </div>
    ))
  }
  return (
    <Wrap>
      <div className="story-header">
        <span className="section-title">스토리</span>
        <span className="show-all">모두보기</span>
      </div>
      <div className="story-container">{storyList()}</div>
    </Wrap>
  )
}

const Wrap = styled.div`
  & > .story-header {
    margin-top: 1.2rem;
    padding: 0.4rem 1.6rem;
    display: flex;
    justify-content: space-between;

    & > .section-title {
      font-size: 1.4rem;
      color: #999;
    }
    & > .show-all {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  & > .story-container {
    margin-top: 0.8rem;
    margin-left: 1.6rem;

    & > .story-item {
      height: 5.2rem;
    }

    & button {
      padding: 0.1rem 0.7rem 0.2rem 0.5rem;
      height: 4.4rem;
      width: 100%;
      border: 0;
      outline: none;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      text-align: left;
    }
    & .user-image {
      width: 3.4rem;
      height: 3.4rem;

      margin: 0;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    & .user-info {
      margin-left: 1.4rem;
      flex: 1 0 auto;

      & .user-name {
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 1.8rem;
        margin-bottom: 0.2rem;
      }
      & .time {
        font-size: 1rem;
        color: #999;
      }
    }
  }
`

export default Index
