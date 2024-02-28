import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { styled } from "styled-components";
import instance from "../axios";
import LoadingAnimation from "../common/loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Popular = () => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        options
      );
      setMovies(request?.data?.results);
      setLoading(false);
      return request;
    }

    fetchData();
  }, []);
  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <Container
      containerClass="carousel-container"
      infinite={true}
      responsive={responsive}
      ssr={true}
    >
      {movies.map((movie) => {
        return (
          <Movie>
            <Fade />
            <MovieImage
              effect="blur"
              width={"100%"}
              height={"100%"}
              alt={
                movie?.title ||
                movie?.original_title ||
                movie?.name ||
                movie?.original_name
              }
              src={
                movie?.poster_path
                  ? `${BASE_URL}${movie?.backdrop_path}`
                  : `${BASE_URL}${movie?.poster_path}`
                  ? "https://static.thenounproject.com/png/4974686-200.png"
                  : null
              }
            />
            <Description>
              <Movie_Title>{movie.title}</Movie_Title>
              <GenreContainer>
                {movie?.genre_ids?.map((genre) => {
                  return <Genre key={genre}>{genre}</Genre>;
                })}
              </GenreContainer>
              <Overview>{movie.overview}</Overview>
              <Button to={`MovieDetails/${movie?.id}`}>Watch Movie</Button>
            </Description>
          </Movie>
        );
      })}
    </Container>
  );
};
const Container = styled(Carousel)`
  display: flex;
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 30px;
  .react-multiple-carousel__arrow.react-multiple-carousel__arrow--left {
    left: 15px;
    min-width: 50px;
    min-height: 50px;
  }
  .react-multiple-carousel__arrow.react-multiple-carousel__arrow--right {
    right: 15px;
    min-width: 50px;
    min-height: 50px;
  }
`;
const Fade = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;
const Movie = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Description = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 15px;
  padding-left: 8%;
  z-index: 2;
`;

const Movie_Title = styled.h3`
  color: white;
  font-size: 40px;
`;
const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 5px;
`;
const Genre = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: 600;
  font-size: 16px;
  background-color: white;
  border: none;
  border-radius: 10px;
  min-width: 80px;
  height: 30px;
`;
const Overview = styled.div`
  color: rgba(255, 255, 255, 0.9);
  width: 350px;
  line-height: 20px;
`;
const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 15%;
  height: 7%;
  font-size: 18px;
  color: white;
  background-color: #261a37;
`;
const MovieImage = styled(LazyLoadImage)`
  object-fit: cover;
`;
export default Popular;
