import React, { useEffect } from "react";
import { styled } from "styled-components";
import { FavMovie, state } from "../valtio/valtio";
import { useSnapshot } from "valtio";

const FavoriteMoviesPage = () => {
  useSnapshot(state, FavMovie);
  const uid = state?.currentUser?.uid;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      state.currentUser = JSON.parse(savedUser);
    }
  }, []);
  useEffect(() => {
    const storedFavoriteMovie = localStorage.getItem(`favoriteMovie+${uid}`);
    if (storedFavoriteMovie) {
      FavMovie.favMovie = JSON.parse(storedFavoriteMovie);
    }
  }, [uid]);
  return <Body></Body>;
};
const Body = styled.div``;
export default FavoriteMoviesPage;
