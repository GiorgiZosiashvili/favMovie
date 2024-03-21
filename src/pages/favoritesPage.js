import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FavMovie, FavTVShow, state } from "../valtio/valtio";
import { useSnapshot } from "valtio";
import Header from "../common/header";
import Card from "../common/Card";

const FavoriteMoviesPage = () => {
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [favoriteTvShow, setFavoriteTvShow] = useState([]);

  useSnapshot(state, FavMovie, FavTVShow);
  FavMovie.favMovie = favoriteMovie;
  FavTVShow.favTvShow = favoriteTvShow;

  const uid = state?.user?.uid;

  console.log(state.user);
  useEffect(() => {
    const storedFavoriteMovie = localStorage.getItem(`favoriteMovie+${uid}`);
    if (storedFavoriteMovie) {
      setFavoriteMovie(JSON.parse(storedFavoriteMovie));
      FavMovie.favMovie = JSON.parse(storedFavoriteMovie);
    }
  }, [uid]);

  useEffect(() => {
    const storedFavoriteTvShow = localStorage.getItem(`favoriteTvShow+${uid}`);
    if (storedFavoriteTvShow) {
      setFavoriteTvShow(JSON.parse(storedFavoriteTvShow));
      FavTVShow.favTvShow = JSON.parse(storedFavoriteTvShow);
    }
  }, [uid]);

  return (
    <Container>
      <Header page="/FavoriteMovies" />
      <Title>Favorite Movies</Title>
      <Body>
        {favoriteMovie?.map((favorite) => {
          const isFavorite = favoriteMovie.some(
            (fav) => fav?.id === favorite?.id
          );
          return (
            <Card
              key={favorite?.id}
              isFavorite={isFavorite}
              data={favorite}
              page="MovieDetails"
            />
          );
        })}
      </Body>
      <Title>Favorite TV Shows</Title>
      <Body>
        {favoriteTvShow?.map((favorite) => {
          const isFavorite = favoriteMovie.some(
            (fav) => fav?.id === favorite?.id
          );
          return (
            <Card
              key={favorite?.id}
              isFavorite={isFavorite}
              data={favorite}
              page="TVshowDetails"
            />
          );
        })}
      </Body>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 2%;
  gap: 10px;
`;
const Body = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 5% 0px 10%;
`;
const Title = styled.h3`
  font-size: 24px;
  color: white;
`;
export default FavoriteMoviesPage;
