import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import instance from "../axios";
import LoadingAnimation from "../common/loading";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FavMovie, state } from "../valtio/valtio";
import { useSnapshot } from "valtio";

import Header from "../common/header";
import Card from "../common/Card";

const MoviePage = () => {
  useSnapshot(state, FavMovie);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(() => {
    const savedPage = parseInt(localStorage.getItem("page"));
    return isNaN(savedPage) ? 1 : savedPage;
  });
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [favoriteMovie, setFavoriteMovie] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      state.currentUser = JSON.parse(savedUser);
    }
  }, []);

  FavMovie.favMovie = favoriteMovie;

  const uid = state?.currentUser?.uid;
  const addToFavorites = (movie) => {
    localStorage.setItem(
      `favoriteMovie+${uid}`,
      JSON.stringify([...favoriteMovie, movie])
    );
    setFavoriteMovie([...favoriteMovie, movie]);
  };

  const removeFromFavorites = (movie) => {
    setFavoriteMovie(favoriteMovie.filter((fav) => fav.id !== movie.id));
    localStorage.setItem(
      `favoriteMovie+${uid}`,
      JSON.stringify(favoriteMovie.filter((fav) => fav.id !== movie.id))
    );
  };
  useEffect(() => {
    const storedFavoriteMovie = localStorage.getItem(`favoriteMovie+${uid}`);
    if (storedFavoriteMovie) {
      setFavoriteMovie(JSON.parse(storedFavoriteMovie));
      FavMovie.favMovie = JSON.parse(storedFavoriteMovie);
    }
  }, [uid]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmU4MmM5ZWQyYjgyNDllNThlNjNmMTEzYTIyZDM3NCIsInN1YiI6IjYzMGRkZTgyYWUzODQzMDA4MWIxZWUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.39HzIR-bviX8W-YLbuvJGBxbg4DyMgChMlEKt-Hc9mc",
      },
    };
    setLoading(true);
    async function fetchData() {
      const request = await instance.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
        options
      );
      setMovies(request.data.results);
      setLoading(false);
      return request;
    }

    fetchData();
  }, [genre, page]);

  const handleChange = (event, value) => {
    setPage(value);
    localStorage.setItem("page", value);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <Movie>
      <Header page="/Movies" />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Body>
          {movies?.map((movie, i) => {
            const isFavorite = favoriteMovie.some(
              (fav) => fav?.id === movie?.id
            );
            return (
              <Card
                moviePage={true}
                key={movie?.id}
                data={movie}
                isFavorite={isFavorite}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                page="MovieDetails"
              />
            );
          })}
        </Body>
      </div>
      <Stack spacing={1}>
        <Pagination
          color="secondary"
          count={500}
          defaultPage={1}
          boundaryCount={2}
          siblingCount={1}
          page={page}
          onChange={handleChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
          }}
        />
      </Stack>
    </Movie>
  );
};
const Movie = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
`;
const Body = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 30px 10%;
  gap: 30px;
`;

export default MoviePage;
