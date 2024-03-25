import React, { useEffect, useState } from "react";
import Row from "../components/homeComp/Row";
import request from "../Request";
import { styled } from "styled-components";
import MovieOfTheDay from "../components/homeComp/movieOfTheDay";
import Genres from "../components/homeComp/genres";

import Header from "../common/header";
import Popular from "../components/Popular";
import { useSnapshot } from "valtio";
import { state } from "../valtio/valtio";

export const API_KEY = `72e82c9ed2b8249e58e63f113a22d374`;
const HomePage = () => {
  const [genreId, setGenreId] = useState("");
  return (
    <Home>
      <Header page="/" />
      <Container>
        <Genres setGenreId={setGenreId} />
        <Popular />
        {/* <MovieOfTheDay /> */}
      </Container>
      {genreId ? (
        <Row
          fetchUrl={`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`}
          title="Recommended For You"
        />
      ) : null}
      <Row title="Popular Movies" fetchUrl={request.fetchTopRated} />
    </Home>
  );
};

const Home = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 2% 0px;
  overflow: ${(props) => (props.modal === "true" ? "hidden" : "scroll")};
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 550px) {
    flex-wrap: wrap;
  }
  margin: 30px 0px;
  gap: 20px;
`;

export default HomePage;
