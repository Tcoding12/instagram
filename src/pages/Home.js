import React from "react";
import styled from "styled-components";
import ContactStuff from "../components/ContactStuff";
import Posts from "../components/Posts";
import Story from "../components/Story";

function Home() {
  return (
    <Container>
      <Seaction>
        <Story />
        <Posts />
      </Seaction>
      <Sect>
        <ContactStuff />
      </Sect>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: grid;
  grid-column: span 1 / span 1;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Seaction = styled.div`
  grid-column: span 1 / span 1;

  @media (min-width: 1024px) {
    grid-column: span 3 / span 3;
    margin: 0 auto;
  }
`;

const Sect = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: inline-grid;
  }
  @media (min-width: 768px) {
    grid-column: span 1 / span 1;
  }
`;
