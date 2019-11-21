import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const PostComment = ({ userName, comment }) => {
  return (
    <Wrap>
      <Link href={{ pathname: '/user', query: { userName } }} as={`/${userName}`}>
        <a>
          <span className="user-name">{userName}</span>
        </a>
      </Link>
      {comment.split(/(#[^#\s,;]+)/gm).map((v, i) => {
        if (v.match(/#[^\s,;]+/)) {
          return (
            <Link
              href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
              as={`/hashtag/${v.slice(1)}`}
              key={i.toString()}
            >
              <a className="hashtag">{v}</a>
            </Link>
          )
        }
        return v
      })}
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;

  & a {
    text-decoration: none;
    color: #000;
  }

  & .hashtag {
    color: #003569;
  }

  & .user-name {
    margin-right: 0.5rem;
    font-weight: 600;
  }
`

export default PostComment
