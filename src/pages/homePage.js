import React, { useEffect, useState } from "react";
import Row from "../components/homeComp/Row";
import request from "../Request";
import { styled } from "styled-components";
import MovieOfTheDay from "../components/homeComp/movieOfTheDay";
import Genres from "../components/homeComp/genres";
import SignInModal from "../auth/signInModal";
import { state } from "../valtio/valtio";
import SignUpModal from "../auth/signUpModal";
import { useSnapshot } from "valtio";
import Header from "../common/header";
export const API_KEY = `72e82c9ed2b8249e58e63f113a22d374`;
const HomePage = () => {
  const [genreId, setGenreId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useSnapshot(state);
  //   useEffect(() => {
  //     currentUser && setShowModal(false);
  //   }, [currentUser]);
  return (
    <Home modal={toString(showModal)}>
      <Header
        setCurrentUser={setCurrentUser}
        setShowModal={setShowModal}
        page="/"
      />
      <Container>
        <Genres setGenreId={setGenreId} />
        <MovieOfTheDay />
      </Container>
      {showModal && !signUp ? (
        <SignInModal setSignUp={setSignUp} setShowModal={setShowModal} />
      ) : showModal && signUp ? (
        <SignUpModal setShowModal={setShowModal} setSignUp={setSignUp} />
      ) : null}
      <Body>
        {genreId ? (
          <Row
            fetchUrl={`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`}
            title="Recommended For You"
          />
        ) : null}
        <Row title="Popular Movies" fetchUrl={request.fetchTopRated} />
      </Body>
    </Home>
  );
};

const Home = styled.div`
  height: 100%;
  padding: 34px 0px 20px 34px;
  overflow: ${(props) => (props.modal === "true" ? "hidden" : "scroll")};
`;
const Body = styled.div`
  width: 100%;
  position: relative;
  color: white;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  margin: 28px 0px;
`;

export default HomePage;
