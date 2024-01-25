import React, { useEffect, useState } from "react";

import { styled } from "styled-components";
import { useSnapshot } from "valtio";
import { FavTVShow, state } from "../valtio/valtio";
import LoadingAnimation from "../common/loading";
import instance from "../axios";
import ContentCard from "../components/homeComp/contentCard";
import { Pagination, Stack } from "@mui/material";
import Header from "../common/header";

const TVShowPage = () => {
  useSnapshot(state, FavTVShow);
  const [tvShow, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState();
  const [loading, setLoading] = useState(false);
  const [favoriteTvShow, setFavoriteTvShow] = useState([]);
  console.log(favoriteTvShow);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      state.currentUser = JSON.parse(savedUser);
    }
  }, []);
  const uid = state?.currentUser?.uid;
  const addToFavorites = (tvShow) => {
    localStorage.setItem(
      `favoriteTvShow+${uid}`,
      JSON.stringify([...favoriteTvShow, tvShow])
    );
    setFavoriteTvShow([...favoriteTvShow, tvShow]);
  };

  const removeFromFavorites = (tvShow) => {
    setFavoriteTvShow(favoriteTvShow.filter((fav) => fav.id !== tvShow.id));
    localStorage.setItem(
      `favoriteTvShow+${uid}`,
      JSON.stringify(favoriteTvShow.filter((fav) => fav.id !== tvShow.id))
    );
  };
  useEffect(() => {
    const storedFavoriteTvShow = localStorage.getItem(`favoriteTvShow+${uid}`);
    if (storedFavoriteTvShow) {
      setFavoriteTvShow(JSON.parse(storedFavoriteTvShow));
      FavTVShow.favTvShow = JSON.parse(storedFavoriteTvShow);
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
        `/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
        options
      );
      setTvShows(request.data.results);
      setLoading(false);
      return request;
    }

    fetchData();
  }, [genre, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <TVSHOW>
      <Header page="/TV Shows" />
      <Body>
        {tvShow.map((tvShow) => {
          const isFavorite = favoriteTvShow.some((fav) => fav.id === tvShow.id);
          return (
            <ContentCard
              addToFavorites={addToFavorites}
              isFavorite={isFavorite}
              removeFromFavorites={removeFromFavorites}
              TVShowPage={true}
              movie={tvShow}
              key={tvShow.id}
            />
          );
        })}
      </Body>
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
    </TVSHOW>
  );
};

const TVSHOW = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 34px 0px 20px 34px;
`;
const Body = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex-wrap: wrap;
`;

export default TVShowPage;
