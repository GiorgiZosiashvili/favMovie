import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import LoadingAnimation from "../../common/loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const MovieOfTheDay = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  function truncate(source, size) {
    return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
  }

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
    fetch(
      `https://api.themoviedb.org/3/movie/${447365}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        setLoading(false);
      })
      .catch((err) => console.error("error", err));
  }, []);

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  return (
    <Body>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <InfoContainer>
            <Name>
              {movie?.original_title ||
                movie?.title ||
                movie?.name ||
                movie?.original_name}
            </Name>
            <Description>{truncate(movie?.overview, 370)}</Description>
            <AdditionalInfo>
              <Length>{hours + "h" + " " + minutes + "min"}</Length>|
              <GenreContainer>
                {movie?.genres?.map((genre) => {
                  return <Genre key={genre.name}>{genre?.name},</Genre>;
                })}
              </GenreContainer>
            </AdditionalInfo>
          </InfoContainer>
          <Poster
            width={"100%"}
            height={"100%"}
            alt={
              movie?.original_title ||
              movie?.title ||
              movie?.name ||
              movie?.original_name
            }
            src={`${BASE_URL}${movie.poster_path}`}
          />
          <Shade />
        </>
      )}
    </Body>
  );
};
const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex: 1;
  position: relative;
`;
const Shade = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  border-radius: 40px;
`;

const InfoContainer = styled.div`
  max-width: 330px;
  min-width: 190px;
  margin-left: 40px;
`;
const Name = styled.h1`
  color: #fff;
  font-size: 42px;
`;
const Poster = styled(LazyLoadImage)`
  object-fit: cover;
  object-position: 0px 32%;
  position: absolute;
  z-index: -1;
  border: none;
  border-radius: 40px;
`;
const Description = styled.h4`
  color: #fff;
  min-width: 150px;
  text-align: start;
  margin: 10px 0px 12px;
  font-size: 14px;
  font-weight: 500;
`;
const AdditionalInfo = styled.div`
  display: flex;
  color: white;
  font-size: 12px;
`;
const Length = styled.h5`
  color: #fff;
  font-size: 12px;
  margin-right: 5px;
  min-width: fit-content;
`;
const GenreContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5px;
`;
const Genre = styled.h2`
  color: white;
  margin-right: 5px;
  font-size: 12px;
  min-width: fit-content;
`;

export default MovieOfTheDay;
