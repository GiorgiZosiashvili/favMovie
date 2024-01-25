import { getAuth, signOut } from "@firebase/auth";
import React, { useState } from "react";
import { styled } from "styled-components";
import { state } from "../valtio/valtio";

const UsersModal = () => {
  const options = [
    {
      title: "Watch Later",
    },
    {
      title: "History",
    },
    {
      title: "My Account",
    },
    {
      title: "Sign Out",
    },
  ];
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("selectedGenre");
        state.currentUser = null;
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <Body>
      {options.map((option, i) => {
        return (
          <Option
            key={i}
            onClick={option.title === "Sign Out" ? () => handleSignOut() : null}
          >
            {option.title}
          </Option>
        );
      })}
    </Body>
  );
};
const Body = styled.ul`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: red;
  color: white;
  top: 50px;
  list-style: none;
  background-color: rgba(39, 27, 74, 1);
  padding: 0px;
  border: none;
  border-radius: 10px;
  z-index: 5;
`;
const Option = styled.li`
  font-size: 14px;
  margin: 15px 36px;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export default UsersModal;
