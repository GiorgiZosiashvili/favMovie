import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Genres = ({ setGenreId }) => {
  const [movieGenre, setMovieGenre] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(() => {
    const storedGenre = localStorage.getItem("selectedGenre");
    return storedGenre ? Number(storedGenre) : null;
  });
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmU4MmM5ZWQyYjgyNDllNThlNjNmMTEzYTIyZDM3NCIsInN1YiI6IjYzMGRkZTgyYWUzODQzMDA4MWIxZWUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.39HzIR-bviX8W-YLbuvJGBxbg4DyMgChMlEKt-Hc9mc",
      },
    };
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((response) => setMovieGenre(response))
      .catch((err) => console.error("error", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
    setGenreId(selectedGenre);
  }, [selectedGenre, setGenreId]);
  return (
    <Body>
      <Title>Genres</Title>
      {movieGenre && (
        <MovieGenres>
          {movieGenre.genres.map((item, i) => {
            const isSelected = selectedGenre === item.id;
            return (
              <Genre
                onClick={() => {
                  setSelectedGenre(item.id);
                }}
                key={i}
                style={{ backgroundColor: isSelected && "#442899" }}
              >
                {item.name}
              </Genre>
            );
          })}
        </MovieGenres>
      )}
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  width: fit-content;
  align-items: flex-start;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

const MovieGenres = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-width: 200px;
  flex-wrap: wrap;
  ::-webkit-scrollbar {
    width: 0;
  }
  margin-right: 90px;
`;

const Genre = styled.li`
  border: solid 1px #fff;
  padding: 10px 0px;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  width: 140px;
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 5px;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
`;

export default Genres;
