import { Avatar, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectName, selectPhoto, setLogOut } from "../features/User/userSlice";
import { auth } from "../firebase/firebase";

function ContactStuff() {
  const name = useSelector(selectName);
  const shortend = name ? name.split(" ")[0] : name;
  const photos = useSelector(selectPhoto);
  const dispatch = useDispatch();

  const LogOut = () => {
    signOut(auth).then((result) => {
      dispatch(setLogOut({ name: null, email: null, uid: null, photo: null }));
    });
  };
  return (
    <Container>
      <Wrapper>
        <User>
          <Avatar src={photos} />
          <span>Welcome {shortend ? shortend : "Guest"} </span>
        </User>
        <Button onClick={LogOut}>LogOut</Button>
      </Wrapper>
    </Container>
  );
}
export default ContactStuff;

const Container = styled.div`
  width: 400px;
  border-radius: 20px;
  background-color: #ffffff;
  border: 1px solid rgba(219, 219, 219, 1);
  height: 500px;
  position: fixed;
  top: 4rem;
  right: 10px;
`;

const Wrapper = styled.div`
  button {
    font-weight: bold;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
  margin-top: 20px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  div {
    :hover {
      transform: scale(1.2);
    }
    transition: transform 150ms ease-out;
    cursor: pointer;
  }

  span {
    margin-left: 10px;
    font-weight: 500;
  }
`;
