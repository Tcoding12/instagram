import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectName,
  selectPhoto,
  setLogin,
  setLogOut,
} from "../features/User/userSlice";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { selectBoolean, setBoolean } from "../features/bool/boolSlice";

function Header() {
  const name = useSelector(selectName);
  const Boolean = useSelector(selectBoolean);
  const img = useSelector(selectPhoto);
  const dispatch = useDispatch();
  const LogIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          setLogin({
            name: user.displayName,
            photo: user.photoURL,
            email: user.email,
            uid: user.uid,
          })
        );
      })
      .catch((err) => console.error(err.message));
  };

  const Starter = () => {
    if (Boolean) {
      dispatch(setBoolean({ boolean: false }));
    } else {
      dispatch(setBoolean({ boolean: true }));
    }
  };
  const LogOut = () => {
    signOut(auth).then((result) => {
      dispatch(setLogOut({ name: null, photo: null, email: null, uid: null }));
    });
  };
  return (
    <Container>
      <Wrapper>
        <HeaderLogo>
          <img src="img/logo.png" alt="logo" />
        </HeaderLogo>
        <SearchContainer>
          <SearchIcon />
          <input type="search" placeholder="Search" />
        </SearchContainer>
        <HeaderRight>
          {name ? (
            <>
              <List>
                <SendRoundedIcon />
              </List>
              <Down>
                <List>
                  <HomeRoundedIcon />
                </List>
                <List>
                  <AddCircleOutlineIcon onClick={Starter} />
                </List>
                <List>
                  <FavoriteBorderRoundedIcon />
                </List>
                <List>
                  <Avatar
                    style={{ cursor: "pointer" }}
                    onClick={LogOut}
                    src={img}
                  />
                </List>
              </Down>
            </>
          ) : (
            <Buttons onClick={LogIn}>SignIn</Buttons>
          )}
        </HeaderRight>
      </Wrapper>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  height: 3.375rem;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
  position: sticky;
  top: 0;
  z-index: 9999;
`;

const Wrapper = styled.div`
  @media (min-width: 1024px) {
    max-width: 62rem;
    margin: 0 auto;
  }
  margin: 0 0.599rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  img {
    object-fit: contain;
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  @media (min-width: 1024px) {
    display: inline-flex;
  }
  display: none;
  align-items: center;
  color: rgba(219, 219, 219, 1);
  border: 1px solid rgba(219, 219, 219, 1);
  padding: 0.3125rem 0.3125rem;
  border-radius: 4px;

  svg {
    height: 1.25rem;
  }
  input {
    border: none;
    height: 100%;
    background-color: transparent;

    :focus {
      outline: none;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const List = styled.li`
  list-style: none;
  margin: 0 1rem;

  svg {
    font-size: 1.5625rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;
const Down = styled.div`
  @media (max-width: 1024px) {
    position: fixed;
    bottom: 0;
    background: white;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(219, 219, 219, 1);
    padding: 10px 10px;
  }

  display: flex;
  align-items: center;
`;

const Buttons = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  color: white;
  cursor: pointer;
  background-color: rgba(59, 130, 246, 1);
`;
