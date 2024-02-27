import { useEffect, useState } from "react";
import LoadingAnimation from "../../common/loading";
import { styled } from "styled-components";

const Episodes = ({ data_id, season, setEpisodeNum }) => {
  const [loading, setLoading] = useState(true);
  const [episodeDetails, setEpisodeDetails] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [selected, setSelected] = useState(1);
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
        const chosenEpisode = item.episode_number === selected;
        return (
          <EpisodeTitle
            onClick={() => {
              setSelected(item?.episode_number);
              setEpisode(item.episode_number);
              setEpisodeNum(item.episode_number);
            }}
            key={item.id}
            style={{
              backgroundColor: chosenEpisode && "darkblue",
            }}
          >
            {`Episode ${item?.episode_number}:`} {item.name}
          </EpisodeTitle>
        );
      })}
    </EpisodeContainer>
  );
};
export default Episodes;
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
