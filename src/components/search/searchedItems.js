import React from "react";
import { styled } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingAnimation from "../../common/loading";
import { Link } from "react-router-dom";

const SearchedItems = ({ data, loading }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return data.length === 0 ? null : (
    <Body key={data.id} style={{ height: data?.length !== 0 ? 250 : 0 }}>
      {data.map((item) => {
        if (loading) {
          return <LoadingAnimation />;
        }

        return (
          <Container
            key={item.id}
            to={
              item.media_type === "movie"
                ? `/MovieDetails/${item.id}`
                : `/TVshowDetails/${item.id}`
            }
            style={{ textDecoration: "none" }}
          >
            <MovieImage
              effect="blur"
              width={"120px"}
              height={"120px"}
              alt={
                item?.original_title ||
                item?.title ||
                item?.name ||
                item?.original_name
              }
              src={
                item?.poster_path
                  ? `${BASE_URL}${item?.poster_path}`
                  : `${BASE_URL}${item.backdrop_path}`
                  ? "https://static.thenounproject.com/png/4974686-200.png"
                  : null
              }
            />
            <TextContainer>
              <Title>
                {item?.title ||
                  item?.original_title ||
                  item?.name ||
                  item?.original_name}
              </Title>
              <Description>
                <Text>
                  {item.media_type}•{item.original_language}•
                  {item.vote_average?.toFixed(1)}{" "}
                </Text>
              </Description>
            </TextContainer>
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
  z-index: 100000;
  width: 100%;
  overflow-y: scroll;
  bottom: -250px;
  background-color: rgba(33, 33, 33, 0.7);
  border: none;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 10px 0px;
  gap: 10px;
`;

const Container = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: 0px 10px;
  gap: 5px;
  max-height: 150px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MovieImage = styled(LazyLoadImage)`
  transition: border-color 450ms;
  border-radius: 10px;
  object-fit: fill;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Description = styled.div`
  width: 100%;
`;

const Title = styled.h4`
  color: white;
`;
const Text = styled.h3`
  color: white;
  text-transform: capitalize;
`;

export default SearchedItems;
