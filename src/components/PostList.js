import {
  Favorite,
  FavoriteBorder,
  MoreHorizOutlined,
  SendOutlined,
  Share,
} from "@mui/icons-material";
import { Avatar, ButtonBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPhoto,
  selectUid,
} from "../features/User/userSlice";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import db, { storage } from "../firebase/firebase";
import Comments from "./Comments";
import { deleteObject, ref } from "firebase/storage";

function PostList({ avatar, p, name, img, email, id }) {
  const [shorten, setShorten] = useState(false);
  const [input, setInput] = useState(null);
  const names = useSelector(selectName);
  const shortenName = names ? names.split(" ")[0] : names;
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);
  const pars = !shorten ? p.slice(" ", "100") : p;
  const photo = useSelector(selectPhoto);
  const [liked, setLiked] = useState([]);
  const userId = useSelector(selectUid);
  const [hasLiked, setHasliked] = useState(false);
  const OriginalEmail = useSelector(selectEmail);

  const Submit = async (e) => {
    e.preventDefault();
    if (!names) return;

    if (input.length > 1) {
      if (loading) return;
      setLoading(true);

      await addDoc(collection(db, "insta", id, "comment"), {
        comment: input,
        name: shortenName,
        photo: photo,
        timestamp: serverTimestamp(),
      });
    }

    setInput(" ");
    setLoading(false);
  };
  useEffect(() => {
    return onSnapshot(collection(db, "insta", id, "likes"), (snapshot) =>
      setLiked(snapshot.docs)
    );
  }, [id]);

  useEffect(() => {
    setHasliked(liked.findIndex((like) => like.id === userId) !== -1);
  }, [userId, liked]);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "insta", id, "comment"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => setComment(snapshot.docs)
    );
  }, [id]);

  const Post = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "insta", id, "likes", userId));
    } else {
      await setDoc(doc(db, "insta", id, "likes", userId), {
        name: names,
      });
    }
  };

  const deletePost = async () => {
    if (!names) return;

    const admin = "your email";

    if (email === OriginalEmail || admin === OriginalEmail) {
      await deleteDoc(doc(db, "insta", id));

      const ImageConst = ref(storage, `insta/${id}/images`);

      await deleteObject(ImageConst)
        .then(() => console.log("post has succesfully been deleted"))
        .catch((error) => console.error(error.message));
    }
  };

  return (
    <Container>
      <PostHeader>
        <User>
          <Avatar src={avatar} />
          <span>{name}</span>
        </User>
        <MoreHorizOutlined style={{ cursor: "pointer" }} onClick={deletePost} />
      </PostHeader>
      <PostContainer>
        <img src={img} alt="stuff" />
      </PostContainer>
      <Social>
        {!hasLiked ? (
          <FavoriteBorder onClick={Post} />
        ) : (
          <Favorite style={{ color: "red" }} onClick={Post} />
        )}
        <Absolute>{liked.length > 0 && <p>{liked.length} likes</p>}</Absolute>

        <SendOutlined className="plane" />
        <Share />
      </Social>
      <Caption>
        <div>
          <span>
            {name}
            {p.length >= 90 ? (
              <p>
                {pars}
                {!shorten ? (
                  <>
                    <Button onClick={() => setShorten(true)}>Read more</Button>
                  </>
                ) : (
                  <Button onClick={() => setShorten(false)}>Read Less</Button>
                )}
              </p>
            ) : (
              <p>{p}</p>
            )}
          </span>
        </div>
      </Caption>
      <CommentDisplay>
        {comment.map((post) => (
          <Comments
            key={post.id}
            caption={post.data().comment}
            name={post.data().name}
            avatar={post.data().photo}
            id={post.id}
          />
        ))}
      </CommentDisplay>
      <CommentSection>
        <Avatar src={photo} />
        <InputContainer>
          <input
            disabled={!names}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </InputContainer>
        <ButtonBase disabled={loading} onClick={Submit}>
          Post
        </ButtonBase>
      </CommentSection>
    </Container>
  );
}

export default PostList;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(219, 219, 219, 1);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  @media (max-width: 768px) {
    :last-child {
      margin-bottom: 70px;
    }
  }
  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-weight: bold;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;

  svg {
    margin: 0 10px;
    font-size: 25px;
    cursor: pointer;
  }

  .plane {
    transform: rotate(-45deg);
  }
`;

const Caption = styled.div`
  display: flex;
  margin: 10px 0;

  div {
    display: flex;
    align-items: center;
    span {
      font-weight: bolder;
      display: flex;
      margin-left: 5px;
      color: black;
    }

    p {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      flex-wrap: wrap;
      max-width: 490px;
      margin-left: 10px;
      color: rgba(75, 85, 99, 1);
    }
  }
`;

const Button = styled.button`
  border-radius: 20px;
  border: none;

  background-color: transparent;
  font-weight: bold;
  color: rgba(37, 99, 235, 1);
  cursor: pointer;
  margin-left: 4px;
  outline: none;
  :hover {
    text-decoration: underline;
  }
`;

const CommentSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  div {
    margin: 0 5px;
  }

  button {
    margin: 0 5px;
    padding: 15px;
    color: rgba(96, 165, 250, 1);
    font-weight: bold;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(107, 114, 128, 1);
    :focus {
      outline: none;
    }
  }
`;

const CommentDisplay = styled.div`
  max-height: 110px;
  margin: 20px 0;
  overflow-y: auto;
`;

const Absolute = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 30px;
  width: 20vh;
  p {
    margin-left: 10px;
    font-size: small;
  }
`;
