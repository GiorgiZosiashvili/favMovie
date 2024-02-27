import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Episodes from "./Episodes";

const Seasons = ({ data, setSeasonNum, setEpisodeNum }) => {
  const [season, setSeason] = useState(1);
  const [selected, setSelected] = useState(null);

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
                <Episodes
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

export default Seasons;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  min-height: 100%;
  max-height: 387px;
  width: 350px;
  background-color: #555;
  padding: 0px 20px;
`;
const SeasonTitle = styled.li`
  font-size: 24px;
  margin: 5px 0px;
  text-decoration: none;
  cursor: pointer;
`;
