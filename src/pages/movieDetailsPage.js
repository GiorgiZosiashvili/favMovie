import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import LoadingAnimation from "../common/loading";
import YouTube from "react-youtube";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import Header from "../common/header";
import VideoPlayer from "../common/VideoPlayer";
import Similar from "../components/Similar";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerId, setTrailerId] = useState([]);
  const hours = Math.floor(movie?.runtime / 60);
  const minutes = String(movie?.runtime % 60).padStart(2, "0");
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
  }, [id]);

  if (loading) {
    return <LoadingAnimation />;
  }
  const filteredId = trailerId?.filter((id) => id.type === "Trailer");

  return (
    <MovieDetails>
      <Header page="/Movies" />
      {/* <Video>
        <YouTube
          videoId={filteredId[0]?.key || filteredId[1]?.key}
          opts={opts}
        />
      </Video> */}
      <Container>
        <VideoPlayer movieId={movie?.id || movie?.imdb_id} />
        <div
          style={{ display: "flex", flex: 0.9, height: "100%", maxHeight: 400 }}
        >
          <Image src={`${BASE_URL}${movie?.poster_path}`} />
          <TextContainer>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <Title>{movie?.title}</Title>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <DetailsText>Language: </DetailsText>
              <DetailsText
                style={{ textTransform: "uppercase", marginLeft: 5 }}
              >
                {movie?.original_language}
              </DetailsText>
            </div>
            <DetailsContainer>
              <GenreContainer>
                {movie?.genres?.map((genre) => {
                  return <Genre key={genre.name}>{genre.name}</Genre>;
                })}
              </GenreContainer>
              <Details>
                <CalendarMonthIcon
                  style={{ color: "white", width: "20", height: "20" }}
                />
                <DetailsText>{movie?.release_date}</DetailsText>
              </Details>
              <Details>
                <AccessTimeIcon
                  style={{ color: "white", width: "20", height: "20" }}
                />
                <DetailsText>
                  {hours + "h " + " : " + minutes + "min"}
                </DetailsText>
              </Details>
              <Details>
                <StarIcon
                  style={{ color: "white", width: "20", height: "20" }}
                />
                <DetailsText>{movie?.vote_average?.toFixed(1)}</DetailsText>
              </Details>
            </DetailsContainer>
            <Description>{movie?.overview}</Description>
          </TextContainer>
        </div>
      </Container>
      <Similar
        page="MovieDetails"
        title="Similar Movies"
        type="movie"
        id={movie?.id}
      />
    </MovieDetails>
  );
};

const MovieDetails = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 20px 0px;
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
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  gap: 10px;
`;
const Image = styled.img`
  object-fit: fill;
  flex: 0.5;
  max-width: 350px;
`;
const TextContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin-left: 10px;
  max-width: 350px;
  gap: 20px;
`;
const Title = styled.h2`
  color: white;
  font-size: 35px;
  font-weight: 600;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 20px;
`;
const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  max-width: 330px;
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
  padding: 5px;
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DetailsText = styled.h3`
  display: flex;
  align-items: flex-end;
  justify-content: left;
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  color: white;
`;

const Description = styled.h4`
  color: white;
  border: none;
  background-color: rgba(255, 255, 255, 0.06);
  font-weight: 400;
  font-size: 16px;
  padding: 5px;
  width: 330px;
  max-height: 170px;
  line-height: 23px;
  overflow-y: scroll;
`;
export default MovieDetailsPage;
