import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import LoadingAnimation from "../../common/loading";

const SeasonsAndEpisodes = ({
  data,
  setSeasonNum,
  setEpisodeNum,
  episodeNum,
}) => {
  const [season, setSeason] = useState("1");
  const [selected, setSelected] = useState(false);

  const EpisodesDetails = ({ data_id, season, setEpisodeNum }) => {
    const [loading, setLoading] = useState(true);
    const [episodeDetails, setEpisodeDetails] = useState(null);
    const [episode, setEpisode] = useState("1");
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
        `https://api.themoviedb.org/3/tv/${data_id}/season/${season}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setEpisodeDetails(response);
          setLoading(false);
        })
        .catch((err) => console.error("error", err));
    }, [data_id]);
    if (loading) {
      return <LoadingAnimation />;
    }

    return (
      <EpisodeContainer>
        {episodeDetails?.episodes?.map((item, index) => {
          return (
            <EpisodeTitle
              key={item.id}
              onClick={() => {
                setEpisode(`${item.episode_number}`);
                setEpisodeNum(`${item.episode_number}`);
              }}
            >
              {`Episode ${item?.episode_number}:`} {item.name}
            </EpisodeTitle>
          );
        })}
      </EpisodeContainer>
    );
  };

  return (
    <Container>
      {data.seasons.map((item, index) => {
        if (item.name !== "Specials") {
          const chosenSeason = item.id === selected;
          return (
            <div
              key={item?.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SeasonTitle
                onClick={() => {
                  setSeasonNum(`${item.season_number}`);
                  setSeason(`${item.season_number}`);
                  setSelected(item.id);
                }}
              >
                {item.name}
              </SeasonTitle>
              {chosenSeason && (
                <EpisodesDetails
                  data_id={data?.id}
                  season={season}
                  setEpisodeNum={setEpisodeNum}
                />
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </Container>
  );
};

export default SeasonsAndEpisodes;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 30%;
  height: 100%;
  min-width: 335px;
  min-height: 299px;
  max-height: 299px;
  background-color: #555;
  padding: 15px 7.5px;
`;
const SeasonTitle = styled.li`
  font-size: 24px;
  margin: 5px 0px;
  text-decoration: none;
  cursor: pointer;
`;
const EpisodeContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 5px 0px;
`;
const EpisodeTitle = styled.h4`
  font-size: 18px;
  margin: 5px 0px;
  text-decoration: none;
  cursor: pointer;
`;
