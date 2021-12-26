import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

function Comments({ name, avatar, caption, id }) {
  const [comment, setComment] = useState(false);
  const CommentInput = comment ? caption.slice(" ", "100") : caption;
  return (
    <Wrapper>
      <UserStuff>
        <Avatar src={avatar} />
        <span>
          {name}
          {CommentInput.lenght >= 90 ? (
            <>
              {!comment ? (
                <>
                  {CommentInput}
                  <Button onClick={() => setComment(true)}>Read more</Button>
                </>
              ) : (
                <>
                  {CommentInput}
                  <Button onClick={() => setComment(false)}>Read Less</Button>
                </>
              )}
            </>
          ) : (
            <>
              <p>{CommentInput} </p>
            </>
          )}
        </span>
      </UserStuff>
    </Wrapper>
  );
}

export default Comments;

const Wrapper = styled.div``;

const UserStuff = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  position: relative;
  span {
    margin-left: 50px;
    font-weight: bold;
    font-size: 15px;
    display: flex;
    padding: 20px 0;

    p {
      margin-left: 10px;
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      max-width: 410px;
      flex-wrap: wrap;
      color: rgba(75, 85, 99, 1);
    }
  }

  div {
    position: absolute;
    top: 10px;
    left: 2px;
  }
`;
const Button = styled.button`
  border-radius: 20px;
  border: 0;
  color: black;
  background-color: transparent;
  font-weight: bold;
  color: rgba(37, 99, 235, 1);
  cursor: pointer;
  margin-left: 4px;
  outline: none;
  transition: all 150ms ease-out;

  :hover {
    text-decoration: underline;
  }
`;
