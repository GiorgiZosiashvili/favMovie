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
import SeasonsAndEpisodes from "../components/TVShowComp/Seasons&Episodes";
import SimilarTVShows from "../components/Similar";
import Similar from "../components/Similar";

const TVShowDetailsPage = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerId, setTrailerId] = useState([]);
  const [seasonNum, setSeasonNum] = useState("1");
  const [episodeNum, setEpisodeNum] = useState("1");
  const hours = Math.floor(tvShow.runtime / 60);
  const minutes = tvShow.runtime % 60;
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
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        setTvShow(response);
        setLoading(false);
      })
      .catch((err) => console.error("error", err));
  }, [id]);

  if (loading) {
    return <LoadingAnimation />;
  }
  const filteredId = trailerId?.filter((id) => id.type === "Trailer");

  return (
    <TVShowDetails>
      <Header page="/TV Shows" />
      {/* <Video>
        <YouTube
          videoId={filteredId[0]?.key || filteredId[1]?.key}
          opts={opts}
        />
      </Video> */}
      <Container>
        <Div style={{ width: "100%" }}>
          <VideoPlayer
            page="/TV Shows"
            tvShowId={tvShow.id}
            seasonNum={seasonNum}
            episodeNum={episodeNum}
          />
          <SeasonsAndEpisodes
            data={tvShow}
            setSeasonNum={setSeasonNum}
            setEpisodeNum={setEpisodeNum}
            episodeNum={episodeNum}
          />
        </Div>
        <Div>
          <Image src={`${BASE_URL}${tvShow.poster_path}`} />
          <TextContainer>
            <Title>{tvShow.name}</Title>
            <DetailsText>
              Language:
              <span style={{ textTransform: "uppercase", marginLeft: 5 }}>
                {tvShow.original_language}
              </span>
            </DetailsText>
            <DetailsContainer>
              <GenreContainer>
                {tvShow.genres.map((genre) => {
                  return <Genre key={genre.name}>{genre.name}</Genre>;
                })}
              </GenreContainer>
              <Details>
                <CalendarMonthIcon
                  style={{ color: "white", width: "17", height: "17" }}
                />
                <DetailsText>{tvShow.last_air_date}</DetailsText>
              </Details>
              <Details>
                <StarIcon
                  style={{ color: "white", width: "17", height: "17" }}
                />
                <DetailsText>{tvShow.vote_average.toFixed(1)}</DetailsText>
              </Details>
            </DetailsContainer>
            <Description>{tvShow.overview}</Description>
          </TextContainer>
        </Div>
      </Container>
      <Similar
        page={"TVshowDetails"}
        title="Similar TV Shows"
        type={"tv"}
        id={tvShow.id}
      />
    </TVShowDetails>
  );
};

const TVShowDetails = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
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
`;
const Div = styled.div`
  display: flex;
  margin: 20px 0px;
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-width: 335px;
`;
const TextContainer = styled.div`
  display: flex;
  max-width: 350px;
  flex-direction: column;
  margin-left: 10px;
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
const Details = styled.div`
  display: flex;
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
`;
export default TVShowDetailsPage;
