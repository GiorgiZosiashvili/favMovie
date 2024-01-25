import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import LoadingAnimation from "../common/loading";
import YouTube from "react-youtube";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import Row from "../components/homeComp/Row";
import { API_KEY } from "./homePage";
import Header from "../common/header";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerId, setTrailerId] = useState([]);
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const opts = {
    height: "700px",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };
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
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        setLoading(false);
      })
      .catch((err) => console.error("error", err));
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then((response) => response.json())
      .then((response) => setTrailerId(response?.results))
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return <LoadingAnimation />;
  }
  const filteredId = trailerId?.filter((id) => id.type === "Trailer");
  return (
    <MovieDetails>
      <Header />
      <Video>
        <YouTube
          videoId={filteredId[0]?.key || filteredId[1]?.key}
          opts={opts}
        />
      </Video>
      <Container>
        <Image src={`${BASE_URL}${movie.poster_path}`} />
        <TextContainer>
          <Title>{movie.original_title}</Title>
          <DetailsContainer>
            {movie.genres.map((genre) => {
              return <Genre key={genre.name}>{genre.name}</Genre>;
            })}
            <Details>
              <CalendarMonthIcon
                style={{ color: "white", width: "17", height: "17" }}
              />
              <DetailsText>{movie.release_date}</DetailsText>
            </Details>
            <Details>
              <AccessTimeIcon
                style={{ color: "white", width: "17", height: "17" }}
              />
              <DetailsText>{hours + ":" + minutes}</DetailsText>
            </Details>
            <Details>
              <StarIcon style={{ color: "white", width: "17", height: "17" }} />
              <DetailsText>{movie.vote_average.toFixed(1)}</DetailsText>
            </Details>
          </DetailsContainer>
          <Description>{movie.overview}</Description>
        </TextContainer>
      </Container>
      <Row
        fetchUrl={`/discover/movie?api_key=${API_KEY}&with_genres=${movie.genres[0].id}`}
        title="You may also like this"
      />
    </MovieDetails>
  );
};

const MovieDetails = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: 37px 44px 60px;
  overflow-x: hidden;
`;
const Video = styled.div`
  width: 100%;
  background-color: black;
  margin-top: 74px;
  margin-bottom: 64px;
  object-fit: contain;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  padding: 0px 44px;
  margin-bottom: 82px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Title = styled.h2`
  color: white;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: fit-content;
  margin-top: 22px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 4px;
`;
const Genre = styled.h2`
  color: black;
  margin-right: 5px;
  font-weight: 600;
  font-size: 16px;
  background-color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  width: fit-content;
`;
const DetailsText = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-left: 10px;
`;
const Image = styled.img`
  object-fit: contain;
  height: 560px;
  margin-right: 91px;
`;

const Description = styled.h4`
  color: white;
  width: 40%;
  border: none;
  background-color: rgba(255, 255, 255, 0.06);
  padding: 16px;
  font-weight: 400;
  font-size: 16px;
  margin-top: 18px;
`;
export default MovieDetailsPage;
