import React from "react";
import { styled } from "styled-components";
import Header from "../common/header";

const AnimationsPage = () => {
  return (
    <>
      <Header page="/Animations" />
      <Body></Body>
    </>
  );
};

const Body = styled.div`
  max-width: 95%;
  margin-right: auto;
  margin-left: auto;
`;
export default AnimationsPage;
