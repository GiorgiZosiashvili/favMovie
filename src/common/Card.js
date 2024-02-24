import React, { useState } from "react";
import { styled } from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Card = ({
  data,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  moviePage,
  TVShowPage,
  page,
}) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  function truncate(source, size) {
    return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
  }

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(data);
    } else {
      addToFavorites(data);
    }
  };
  return (
    <Content key={data?.id}>
      {moviePage || TVShowPage ? (
        <Favorite onClick={handleFavoriteClick}>
          <FavoriteIcon style={{ color: isFavorite ? "red" : "#fff" }} />
        </Favorite>
      ) : null}
      <Link
        key={data?.id}
        to={`/${page}/${data?.id}`}
        style={{ textDecoration: "none" }}
      >
        <MovieImage
          effect="blur"
          width={"100%"}
          alt={
            data?.title ||
            data?.original_title ||
            data?.name ||
            data?.original_name
          }
          src={
            data?.backdrop_path
              ? `${BASE_URL}${data?.poster_path}`
              : "https://static.thenounproject.com/png/4974686-200.png"
          }
        />
        <MovieName>
          {truncate(
            data?.title ||
              data?.original_title ||
              data?.name ||
              data?.original_name,
            20
          )}
        </MovieName>
      </Link>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  position: relative;
  width: 17%;
  min-width: 170px;
  height: 340px;
  flex-direction: column;
  transition: transform 450ms;
  border-radius: 10px;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Favorite = styled.div`
  display: flex;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.25);
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

const MovieImage = styled(LazyLoadImage)`
  transition: border-color 450ms;
  min-height: 255px;
  height: 280px;
  border-radius: 10px;
  ${Content}:hover & {
    border: solid 2px #4200ff;
  }
`;

const MovieName = styled.h4`
  color: white;
  font-weight: 700;
  font-size: 18px;
  margin-top: 10px;
`;

export default Card;
