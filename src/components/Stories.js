import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

function Stories({ name, avatar }) {
  return (
    <Container>
      <Circle>
        <Avatar src={avatar} />
      </Circle>
      <span>{name}</span>
    </Container>
  );
}

export default Stories;

const Container = styled.div`
  max-height: 7.375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 0.25rem;
  margin: 0 0.625rem;
  span {
    text-align: center;
    width: 75px;
    font-size: small;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Circle = styled.div`
  background: radial-gradient(
      circle farthest-corner at 35% 90%,
      #fec564,
      transparent 50%
    ),
    radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%),
    radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%),
    radial-gradient(
      ellipse farthest-corner at 20% -50%,
      #5258cf,
      transparent 50%
    ),
    radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%),
    radial-gradient(
      ellipse farthest-corner at 60% -20%,
      #893dc2,
      transparent 50%
    ),
    radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent),
    linear-gradient(
      #6559ca,
      #bc318f 30%,
      #e33f5f 50%,
      #f77638 70%,
      #fec66d 100%
    );
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 99999999px;
  transition: transform 150ms ease-out;

  :hover {
    transform: scale(1.1);
  }
`;
