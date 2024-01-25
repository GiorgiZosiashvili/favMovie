import React from "react";
import { styled } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingAnimation from "../../common/loading";

const SearchedItems = ({ data, loading }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  console.log("data", data);
  return data.length === 0 ? null : (
    <Body style={{ height: data?.length !== 0 ? 250 : 0 }}>
      {data.map((item) => {
        if (loading) {
          return <LoadingAnimation />;
        }
        return (
          <Container key={item.id}>
            <MovieImage
              effect="blur"
              width={"100%"}
              height={"100%"}
              alt={
                item?.original_title ||
                item?.title ||
                item?.name ||
                item?.original_name
              }
              src={
                item?.backdrop_path
                  ? `${BASE_URL}${item?.backdrop_path}`
                  : "https://static.thenounproject.com/png/4974686-200.png"
              }
            />
            <Title></Title>
          </Container>
        );
      })}
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 2;
  width: 100%;
  overflow-y: scroll;
  bottom: -250px;
  background-color: rgba(33, 33, 33, 0.38);
  border: none;
  border-radius: 10px;
  padding: 10px 0px;
`;

const Container = styled.div`
  display: flex;
  margin: 5px 10px;
`;

const MovieImage = styled(LazyLoadImage)`
  transition: border-color 450ms;
  border-radius: 10px;
  object-fit: fill;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.h4``;

export default SearchedItems;
