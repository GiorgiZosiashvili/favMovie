import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchedItems from "./searchedItems";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (keyword.trim() === "") {
      setData([]);
      setLoading(false);
      return;
    }

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
      `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=true&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setData(response.results);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [keyword]);
  return (
    <Body>
      <Form
        onSubmit={handleSubmit}
        keyword={keyword}
        active={active}
        onClick={() => !active && setActive(true)}
      >
        <SearchIconWrapper>
          <SearchIcon
            style={{
              fontSize: 24,
              color: "white",
              position: "absolute",
              left: 5,
              top: 5,
            }}
          />
        </SearchIconWrapper>
        <Input
          active={active}
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {keyword.length !== 0 && (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation(); // Prevent Form onClick from being triggered
              setKeyword("");
              setActive(false);
            }}
            style={{ fontSize: 24, color: "rgba(217, 217, 217, 0.3)" }}
          />
        )}
      </Form>
      <SearchedItems loading={loading} data={data} />
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 25%;
  max-width: 300px;
  min-width: 220px;
`;

const Form = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: rgba(33, 33, 33, 0.7);
  color: white;
  border: none;
  border-radius: ${(props) => (props.keyword.length === 0 ? "20px" : "0px")};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  cursor: pointer;
  width: ${(props) => (props.active ? "100%" : "35px")};
  transition: width 1.2s ease, visibility 0.5s;
  height: 35px;
`;

const Input = styled.input`
  background: none;
  width: ${(props) => (props.active ? "100%" : "0")};
  color: rgba(255, 255, 255, 0.8);
  border: none;
  position: absolute;
  left: 30px;
  font-size: 16px;
  transition: width 1s ease, visibility 0.5s;
  &::placeholder {
    color: gray;
    font-size: 14px;
  }
  &:focus {
    outline: none;
  }
`;

const SearchIconWrapper = styled.div``;

const CloseIcon = styled(CancelIcon)`
  cursor: pointer;
  position: absolute;
  right: 10px;
  transition: width 0.5s ease, visibility 0.2s;
`;

export default Search;
