import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/firebase";
import PostList from "./PostList";

function Posts() {
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "insta"), orderBy("timestamp", "desc")),
      (snapshots) => {
        setSelected(snapshots.docs);
      }
    );
  }, []);
  return (
    <div>
      {selected.map((post) => (
        <PostList
          key={post?.id}
          p={post?.data().caption}
          name={post?.data().name}
          img={post?.data().img}
          avatar={post?.data().photo}
          email={post?.data().email}
          id={post?.id}
        />
      ))}
    </div>
  );
}

export default Posts;
