import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSnapshot } from "valtio";
import { FavTVShow, state } from "../valtio/valtio";
import LoadingAnimation from "../common/loading";
import instance from "../axios";
import { Pagination, Stack } from "@mui/material";
import Header from "../common/header";
import Card from "../common/Card";
import FilterTVShow from "../components/TVShowComp/FilterTVShow";

const TVShowPage = () => {
  useSnapshot(state, FavTVShow);
  const [tvShow, setTvShows] = useState([]);
  const [page, setPage] = useState(() => {
    const savedPage = parseInt(localStorage.getItem("tvShowPage"));
    return isNaN(savedPage) ? 1 : savedPage;
  });
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [favoriteTvShow, setFavoriteTvShow] = useState([]);

  useEffect(() => {
    localStorage.setItem("tvShowPage", page);
  }, [page]);

  const addToFavorites = (tvShow) => {
    localStorage.setItem(
      `favoriteTvShow`,
      JSON.stringify([...favoriteTvShow, tvShow])
    );
    setFavoriteTvShow([...favoriteTvShow, tvShow]);
  };

  const removeFromFavorites = (tvShow) => {
    setFavoriteTvShow(favoriteTvShow.filter((fav) => fav.id !== tvShow.id));
    localStorage.setItem(
      `favoriteTvShow`,
      JSON.stringify(favoriteTvShow.filter((fav) => fav.id !== tvShow.id))
    );
  };

  useEffect(() => {
    const storedFavoriteTvShow = localStorage.getItem(`favoriteTvShow`);
    if (storedFavoriteTvShow) {
      setFavoriteTvShow(JSON.parse(storedFavoriteTvShow));
      FavTVShow.favTvShow = JSON.parse(storedFavoriteTvShow);
    }
  }, []);

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
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`,
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
    <TVShow>
      <Header page="/TV Shows" />
      <FilterTVShow />
      <Body>
        {tvShow.map((tvShow) => {
          const isFavorite = favoriteTvShow.some((fav) => fav.id === tvShow.id);
          return (
            <Card
              addToFavorites={addToFavorites}
              isFavorite={isFavorite}
              removeFromFavorites={removeFromFavorites}
              TVShowPage={true}
              data={tvShow}
              key={tvShow.id}
              page={"TVshowDetails"}
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
    </TVShow>
  );
};

const TVShow = styled.div`
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

export default TVShowPage;
