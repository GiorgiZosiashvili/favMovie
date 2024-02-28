import React, { useState } from "react";
import Row from "../components/homeComp/Row";
import request from "../Request";
import { styled } from "styled-components";
import MovieOfTheDay from "../components/homeComp/movieOfTheDay";
import Genres from "../components/homeComp/genres";
import SignInModal from "../auth/signInModal";
import { state } from "../valtio/valtio";
import SignUpModal from "../auth/signUpModal";

import Header from "../common/header";
import Popular from "../components/Popular";
import { useSnapshot } from "valtio";
export const API_KEY = `72e82c9ed2b8249e58e63f113a22d374`;
const HomePage = () => {
  const [genreId, setGenreId] = useState("");
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useSnapshot(state);
  console.log("current", user);

  return (
    <Home>
      <Header
        setCurrentUser={setCurrentUser}
        setSignInModal={setSignInModal}
        page="/"
      />
      <Container>
        <Genres setGenreId={setGenreId} />
        {/* <MovieOfTheDay /> */}
        <Popular />
      </Container>
      {signInModal ? (
        <SignInModal
          setSignUpModal={setSignUpModal}
          setSignInModal={setSignInModal}
        />
      ) : signUpModal ? (
        <SignUpModal
          setSignUpModal={setSignUpModal}
          setSignInModal={setSignInModal}
        />
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
  padding: 20px 40px 0px;
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
  margin: 40px 0px;
`;

export default HomePage;
