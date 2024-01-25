import React, { useEffect, useState } from "react";
import instance from "../../axios";
import { styled } from "styled-components";
import LoadingAnimation from "../../common/loading";
import { FavMovie } from "../../valtio/valtio";
import ContentCard from "./contentCard";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      setLoading(false);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <Body>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <MoviesContainer>
        {movies.map((movie, i) => {
          return <ContentCard key={movie?.id} movie={movie} />;
        })}
      </MoviesContainer>
    </Body>
  );
};

const Body = styled.div`
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const MoviesContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 35px 0px 2px 20px;
`;

const TitleContainer = styled.div`
  display: inline-block;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  border: solid 1px #ffffff;
  border-radius: 40px;
  padding: 12px;
`;

export default Row;
