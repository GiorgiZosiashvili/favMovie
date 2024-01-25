import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchedItems from "./searchedItems";
const Search = ({ setSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
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
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setData(response.results);
      })
      .catch((err) => console.error(err));
  }, [keyword]);

  return (
    <Body>
      <Form onSubmit={handleSubmit}>
        <Div>
          <SearchIcon style={{ fontSize: 24, color: "white" }} />
          <Input
            type="text"
            placeholder="Search"
            color="white"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </Div>
        <CloseIcon
          onClick={() => {
            setSearch(false);
            setKeyword("");
          }}
          style={{ fontSize: 24, color: "rgba(217, 217, 217, 0.3)" }}
        />
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
`;
const Form = styled.form`
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  background-color: rgba(33, 33, 33, 0.38);
  padding: 5px 16px;
  border: none;
  border-radius: 20px;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
`;
const CloseIcon = styled(CancelIcon)`
  cursor: pointer;
`;
const Input = styled.input`
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  &::placeholder {
    color: white;
    font-size: 14px;
  }
  &:focus {
    outline: none;
  }
`;
export default Search;
