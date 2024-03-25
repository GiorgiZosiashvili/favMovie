import React, { useState } from "react";
import { styled } from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { state } from "../valtio/valtio";
const Card = ({
  data,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  moviePage,
  TVShowPage,
  page,
  type,
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
      {state?.user?.uid && type !== "Favorite" ? (
        <Favorite onClick={handleFavoriteClick}>
          <StyledFavoriteIcon isFavorite={isFavorite} />
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
            data?.poster_path
              ? `${BASE_URL}${data?.poster_path}`
              : `${BASE_URL}${data?.backdrop_path}`
              ? "https://static.thenounproject.com/png/4974686-200.png"
              : null
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
  flex-direction: row;
  width: 17%;
  min-width: 220px;
  max-width: 250px;
  flex-direction: column;
  transition: transform 450ms;
  border-radius: 10px;
  &:hover {
    transform: scale(1.15);
    cursor: pointer;
  }
`;

const Favorite = styled.div`
  display: flex;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.25);
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
const StyledFavoriteIcon = styled(FavoriteIcon)`
  color: ${(props) => (props.isFavorite ? "red" : "#fff")};
  transition: color 0.5s ease;
  &:hover {
    color: red;
    transition: all 1s ease;
  }
`;
const MovieImage = styled(LazyLoadImage)`
  transition: border-color 450ms;
  min-height: 255px;
  height: 300px;
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
