import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Post from "./pages/Post";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { setLogin, setLogOut } from "./features/User/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uid: user.uid,
          })
        );
      } else {
        dispatch(
          setLogOut({ name: null, photo: null, email: null, uid: null })
        );
      }
    });
  }, [dispatch]);
  return (
    <Container>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Post />
    </Container>
  );
}

export default App;

const Container = styled.div``;
