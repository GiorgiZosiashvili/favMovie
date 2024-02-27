import React, { useState } from "react";
import { styled } from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ContentCard = ({
  movie,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  moviePage,
  TVShowPage,
}) => {
  //   const [hovered, setHovered] = useState(false);
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  function truncate(source, size) {
    return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
  }

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };
  return (
    <Content
      //   onMouseLeave={() => {
      //     setHovered(false);
      //   }}
      //   onMouseEnter={() => setHovered(true)}
      key={movie?.id}
    >
      {moviePage || TVShowPage ? (
        <Favorite onClick={handleFavoriteClick}>
          <FavoriteIcon style={{ color: isFavorite ? "red" : "#fff" }} />
        </Favorite>
      ) : null}
      <Link
        key={movie?.id}
        to={`/MovieDetails/${movie.id}`}
        style={{ textDecoration: "none" }}
      >
        <MovieImage
          effect="blur"
          width={196}
          height={265}
          alt={
            movie?.title ||
            movie?.original_title ||
            movie?.name ||
            movie?.original_name
          }
          src={`${BASE_URL}${movie?.poster_path}`}
        />
        <MovieName>
          {truncate(
            movie?.title ||
              movie.original_title ||
              movie?.name ||
              movie?.original_name,
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
  max-width: 196px;
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
  border-radius: 10px;
  ${Content}:hover & {
    border: solid 2px #4200ff;
  }
`;

const MovieName = styled.h4`
  color: white;
  font-weight: 700;
  font-size: 18px;
  height: 50px;
  margin-top: 10px;
`;

export default ContentCard;
