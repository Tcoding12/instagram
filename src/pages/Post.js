import { CollectionsOutlined } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPhoto,
} from "../features/User/userSlice";
import db, { storage } from "../firebase/firebase";
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { selectBoolean, setBoolean } from "../features/bool/boolSlice";

function Post() {
  const selectImage = useRef(null);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const name = useSelector(selectName);
  const photo = useSelector(selectPhoto);
  const email = useSelector(selectEmail);
  const shorten = name ? name.split(" ")[0] : name;
  const dispatch = useDispatch();
  const boolean = useSelector(selectBoolean);

  const Submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const file = await addDoc(collection(db, "insta"), {
      name: shorten,
      photo: photo,
      email: email,
      caption: input,
      timestamp: serverTimestamp(),
    });

    const images = ref(storage, `insta/${file.id}/images`);

    await uploadString(images, selected, "data_url")
      .then(async (snapshot) => {
        const download = await getDownloadURL(images);
        await updateDoc(doc(db, "insta", file.id), {
          img: download,
        });
      })
      .catch((error) => console.error(error.message));

    setInput(" ");
    setSelected(null);
    setLoading(false);
    dispatch(setBoolean({ boolean: false }));
  };

  const SelectedImage = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (Event) => {
        setSelected(Event.target.result);
      };
    }
  };

  return (
    <Container user={boolean}>
      <CloseContainer onClick={() => dispatch(setBoolean({ boolean: false }))}>
        <CloseRoundedIcon />
      </CloseContainer>
      <Wrapper>
        <TopSection>
          {selected ? (
            <ImageContainer>
              <img src={selected} alt="selected" />
            </ImageContainer>
          ) : (
            <CollectionsOutlined onClick={() => selectImage.current.click()} />
          )}

          <input
            type="file"
            ref={selectImage}
            onChange={SelectedImage}
            hidden
          />
        </TopSection>
        <ButtomSection onSubmit={Submit}>
          <InputContainer>
            <input
              type="text"
              placeholder="Caption"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </InputContainer>
          <button disabled={loading} onClick={Submit}>
            {loading ? "Posting" : "Post"}
          </button>
        </ButtomSection>
      </Wrapper>
    </Container>
  );
}

export default Post;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 150ms ease-out;
  transform: ${(props) => (props.user ? `translateY(0)` : `translateY(-100%)`)};
`;

const Wrapper = styled.div`
  max-height: 550px;
  height: 450px;
  width: 400px;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 9999999999;
`;

const TopSection = styled.div`
  height: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 50px;
    cursor: pointer;
    color: rgba(107, 114, 128, 1);
  }
`;
const ButtomSection = styled.form`
  height: 50%;
  background-color: transparent;
  position: relative;
  padding-top: 30px;

  button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 10px 20px;
    border: none;
    background-color: rgba(59, 130, 246, 1);
    color: white;
    border-radius: 20px;
    cursor: pointer;
    transition: all 150ms ease-out;
    :hover {
      opacity: 0.75;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;
const InputContainer = styled.div`
  width: 90%;
  border-bottom: 1px solid black;
  margin-left: 5px;

  input {
    width: 100%;
    border: none;
    :focus {
      outline: none;
    }
  }
`;

const CloseContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
  transition: all 150ms ease-out;
  height: 24px;
  :hover {
    opacity: 0.5;
  }
`;
