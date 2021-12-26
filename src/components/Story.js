import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Stories from "./Stories";

function Story() {
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const suggestion = [
      {
        id: 0,
        name: " Wilfred69",
        image: "img/first.jpg",
      },
      {
        id: 1,
        name: "Oswaldo81",
        image: "img/second.jpg",
      },
      {
        id: 2,
        name: " Watson_Ritchie",
        image: "img/third.jpg",
      },
      {
        id: 3,
        name: " Jerrell_Thompson82",
        image: "img/fourth.jpg",
      },
      {
        id: 4,
        name: "  Margaret_Marquardt",
        image: "img/five.jpg",
      },
      {
        id: 5,
        name: "  Hadley77",
        image: "img/seven.jpg",
      },
      {
        id: 6,
        name: " Verlie_Carroll59",
        image: "img/eight.jpg",
      },
      {
        id: 7,
        name: " Jasen.Hilll29",
        image: "img/nine.jpg",
      },
    ];
    setSelected(suggestion);
  }, []);
  return (
    <Container>
      {selected.map((profile) => (
        <Stories key={profile.id} name={profile.name} avatar={profile.image} />
      ))}
    </Container>
  );
}

export default Story;

const Container = styled.div`
  display: flex;
  @media (min-width: 1024px) {
    max-width: 618px;
    padding: 15px 0;
  }
  padding: 10px 0;
  margin: 20px 0;
  overflow: auto;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(219, 219, 219, 1);
  ::-webkit-scrollbar {
    display: none;
  }
`;
