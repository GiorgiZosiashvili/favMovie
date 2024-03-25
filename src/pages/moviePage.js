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
import MovieFiler from "../components/MovieComp/MovieFiler";

const MoviePage = () => {
  const store = useSnapshot(state, FavMovie);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(() => {
    const savedPage = parseInt(localStorage.getItem("page"));
    return isNaN(savedPage) ? 1 : savedPage;
  });
  const [loading, setLoading] = useState(false);
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [genre, setGenre] = useState(() => {
    const savedGenre = parseInt(localStorage.getItem("genre"));
    return isNaN(savedGenre) ? "" : savedGenre;
  });
  const [year, setYear] = useState(() => {
    const savedYear = parseInt(localStorage.getItem("year"));
    return isNaN(savedYear) ? "" : savedYear;
  });
  const [rating, setRating] = useState(() => {
    const savedRating = parseInt(localStorage.getItem("rating"));
    return isNaN(savedRating) ? "" : savedRating;
  });
  const [pagesCount, setPagesCount] = useState(null);

  const userUid = store?.user?.uid;
  FavMovie.favMovie = favoriteMovie;

  console.log("store", store.user);

  const addToFavorites = (movie) => {
    localStorage.setItem(
      `favoriteMovie${userUid}`,
      JSON.stringify([...favoriteMovie, movie])
    );
    setFavoriteMovie([...favoriteMovie, movie]);
  };
  const removeFromFavorites = (movie) => {
    setFavoriteMovie(favoriteMovie.filter((fav) => fav.id !== movie.id));
    localStorage.setItem(
      `favoriteMovie${userUid}`,
      JSON.stringify(favoriteMovie.filter((fav) => fav.id !== movie.id))
    );
  };

  useEffect(() => {
    const storedFavoriteMovie = localStorage.getItem(`favoriteMovie${userUid}`);
    if (storedFavoriteMovie) {
      setFavoriteMovie(JSON.parse(storedFavoriteMovie));
      FavMovie.favMovie = JSON.parse(storedFavoriteMovie);
    }
  }, [userUid]);

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
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=${year}&sort_by=popularity.desc&vote_average.gte=${rating}&with_genres=${genre}`,
        options
      );
      setMovies(request.data.results);
      setLoading(false);
      setPagesCount(request.data.total_pages);
    }

    fetchData();
  }, [genre, page, year, rating]);

  const handleChange = (event, value) => {
    const limitedPage = Math.min(value, 500); // Limit the page to maximum 500
    setPage(limitedPage);
    localStorage.setItem("page", limitedPage);
  };
  useEffect(() => {
    localStorage.setItem("genre", genre);
    localStorage.setItem("year", year);
    localStorage.setItem("rating", rating);
  }, [genre, year, rating]);

  return (
    <Movie>
      <Header page="/Movies" />
      <MovieFiler
        year={year}
        genre={genre}
        rating={rating}
        setGenre={setGenre}
        setYear={setYear}
        setRating={setRating}
      />
      <Body>
        {loading ? (
          <LoadingAnimation />
        ) : (
          movies?.map((movie, i) => {
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
          })
        )}
      </Body>
      {!loading && (
        <Stack spacing={1}>
          <Pagination
            color="secondary"
            count={Math.min(pagesCount, 500)}
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
      )}
    </Movie>
  );
};
const Movie = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 2%;
`;
const Body = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 30px 0px;
  gap: 25px;
`;

export default MoviePage;
