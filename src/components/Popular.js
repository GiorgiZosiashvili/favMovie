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
  function truncate(source, size) {
    return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmU4MmM5ZWQyYjgyNDllNThlNjNmMTEzYTIyZDM3NCIsInN1YiI6IjYzMGRkZTgyYWUzODQzMDA4MWIxZWUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.39HzIR-bviX8W-YLbuvJGBxbg4DyMgChMlEKt-Hc9mc",
          },
        };
        const request = await instance.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
          options
        );
        setMovies(request?.data?.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      } finally {
        setLoading(false);
      }
    };
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
          <Movie key={movie.id}>
            <MovieImage>
              <LazyLoadImage
                effect="blur"
                width={"100%"}
                height={"500px"}
                alt={
                  movie?.poster_path
                    ? `${BASE_URL}${movie?.poster_path}`
                    : `${BASE_URL}${movie?.backdrop_path}`
                    ? "https://static.thenounproject.com/png/4974686-200.png"
                    : null
                }
                src={
                  movie?.poster_path
                    ? `${BASE_URL}${movie?.backdrop_path}`
                    : `${BASE_URL}${movie?.poster_path}`
                    ? "https://static.thenounproject.com/png/4974686-200.png"
                    : null
                }
              />
            </MovieImage>
            <Description>
              <Movie_Title>{truncate(movie.title, 20)} </Movie_Title>
              <GenreContainer>
                {movie?.genre_ids?.map((genre) => {
                  return <Genre key={genre}>{genre}</Genre>;
                })}
              </GenreContainer>
              <Overview> {truncate(movie.overview, 300)} </Overview>
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
  min-width: 100%;
  min-width: 300px;
  height: 500px;
  border-radius: 30px;
  @media (max-width: 1005px) {
    max-height: 500px;
  }

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
const Movie = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: left;
  min-width: 100%;
  height: 100%;
  background-color: bl;
`;
const Description = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 500px;
  flex-direction: column;
  gap: 15px;
  z-index: 5;
  margin-left: 70px;
`;

const Movie_Title = styled.h3`
  color: white;
  font-size: 40px;
  max-width: 300px;
`;
const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 5px;
  width: 250px;
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
  max-width: 280px;
  line-height: 20px;
`;
const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px;
  max-width: 150px;
  font-size: 18px;
  color: white;
  background-color: #261a37;
`;
const MovieImage = styled.div`
  object-fit: cover;
  position: absolute;
  min-width: 100%;
  min-height: 500px;
  opacity: 0.75;
`;
export default Popular;
