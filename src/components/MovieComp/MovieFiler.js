import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Dropdown from "../../common/DropDown";
import CloseIcon from "@mui/icons-material/Close";

const MovieFiler = ({ setYear, setGenre, setRating, year, genre, rating }) => {
  const [movieGenre, setMovieGenre] = useState("");
  const [activeField, setActiveField] = useState(false);

  const years = Array.from(
    { length: 2024 - 1950 + 1 },
    (_, index) => 1950 + index
  );
  const movieRating = Array.from(
    { length: 10 - 1 + 1 },
    (_, index) => 1 + index
  );

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

  const found = movieGenre?.genres?.find(
    (foundGenre) => foundGenre.id === genre
  );

  useEffect(() => {
    if (year || genre || rating !== "") {
      setActiveField(true);
    }
  }, [year, genre, rating]);

  return (
    <Container>
      <Dropdown
        title="Select Year"
        data={years}
        setValue={setYear}
        value={year}
        activeField={activeField}
      />
      <Dropdown
        title="Select Genre"
        data={movieGenre.genres}
        setValue={setGenre}
        type="Genre"
        value={found?.name}
        activeField={activeField}
      />
      <Dropdown
        title="Select Rating"
        data={movieRating}
        setValue={setRating}
        value={rating}
        type="Rating"
        activeField={activeField}
      />
      <CloseIcon
        onClick={() => {
          setActiveField(false);
          setYear("");
          setGenre("");
          setRating("");
          localStorage.removeItem("genre");
          localStorage.removeItem("year");
          localStorage.removeItem("rate");
        }}
        style={{ fontSize: 40, color: "white", cursor: "pointer" }}
      />
    </Container>
  );
};

export default MovieFiler;
const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: left;
  gap: 10px;
`;
const Remove = styled(CloseIcon)`
  color: white;
  height: 40px;
  width: 40px;
  background-color: red;
  font-size: 40px;
`;
