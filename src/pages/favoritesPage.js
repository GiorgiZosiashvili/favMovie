import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FavMovie, FavTVShow, state } from "../valtio/valtio";
import { useSnapshot } from "valtio";
import Header from "../common/header";
import Card from "../common/Card";

const FavoriteMoviesPage = () => {
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [favoriteTvShow, setFavoriteTvShow] = useState([]);

  const store = useSnapshot(state, FavMovie, FavTVShow);
  FavMovie.favMovie = favoriteMovie;
  FavTVShow.favTvShow = favoriteTvShow;
  const userUid = store?.user?.uid;
  useEffect(() => {
    const storedFavoriteMovie = localStorage.getItem(`favoriteMovie${userUid}`);

    if (storedFavoriteMovie) {
      setFavoriteMovie(JSON.parse(storedFavoriteMovie));
      FavMovie.favMovie = JSON.parse(storedFavoriteMovie);
    }
    const storedFavoriteTvShow = localStorage.getItem(
      `favoriteTvShow${userUid}`
    );
    if (storedFavoriteTvShow) {
      setFavoriteTvShow(JSON.parse(storedFavoriteTvShow));
      FavTVShow.favTvShow = JSON.parse(storedFavoriteTvShow);
    }
  }, [userUid]);
  console.log(userUid);
  return (
    <Container>
      <Header page="/FavoriteMovies" />
      {favoriteMovie.length !== 0 ? (
        <>
          <Title>Favorite Movies</Title>
          <Body>
            {favoriteMovie?.map((favorite) => {
              return (
                <Card
                  key={favorite?.id}
                  data={favorite}
                  page="MovieDetails"
                  type="Favorite"
                />
              );
            })}
          </Body>
        </>
      ) : null}
      {favoriteTvShow.length !== 0 ? (
        <>
          <Title>Favorite TV Shows</Title>
          <Body>
            {favoriteTvShow?.map((favorite) => {
              return (
                <Card
                  key={favorite?.id}
                  data={favorite}
                  page="TVshowDetails"
                  type="Favorite"
                />
              );
            })}
          </Body>
        </>
      ) : null}
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
  width: 98%;
  margin: 0% 1%;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
  gap: 20px;
`;
const Title = styled.h3`
  font-size: 24px;
  color: white;
`;
export default FavoriteMoviesPage;
