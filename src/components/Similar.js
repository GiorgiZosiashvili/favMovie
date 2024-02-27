import React, { useEffect, useState } from "react";
import LoadingAnimation from "../common/loading";
import { styled } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
const Similar = ({ type, id, title, page }) => {
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState(true);
  const BASE_URL = "https://image.tmdb.org/t/p/original";
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
      `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setSimilar(response);
        setLoading(false);
      })
      .catch((err) => console.error("error", err));
  }, [id]);
  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <Title>{title}</Title>
      <Container>
        {similar.results.map((item) => {
          return (
            <Content key={item.id} to={`/${page}/${item?.id}`}>
              <MovieImage
                effect="blur"
                width={196}
                height={265}
                alt={
                  item?.title ||
                  item?.original_title ||
                  item?.name ||
                  item?.original_name
                }
                src={
                  item?.poster_path
                    ? `${BASE_URL}${item?.poster_path}`
                    : `${BASE_URL}${item?.backdrop_path}`
                    ? "https://static.thenounproject.com/png/4974686-200.png"
                    : null
                }
              />
              <Name>
                {truncate(
                  item?.title ||
                    item?.name ||
                    item.original_title ||
                    item?.original_name,
                  20
                )}
              </Name>
            </Content>
          );
        })}
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  height: 400px;
  gap: 30px;
  padding: 0px 20px;
  ::-webkit-scrollbar {
    width: 0;
  }
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  border: solid 1px #ffffff;
  border-radius: 40px;
  padding: 12px 20px;
  align-self: flex-start;
`;
const Content = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 196px;
  flex-direction: column;
  transition: transform 450ms;
  border-radius: 10px;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;
const MovieImage = styled(LazyLoadImage)`
  transition: border-color 450ms;
  border-radius: 10px;
  ${Content}:hover & {
    border: solid 2px #4200ff;
  }
`;
const Name = styled.h3`
  color: white;
  font-size: 24px;
  height: 55px;
`;

export default Similar;
