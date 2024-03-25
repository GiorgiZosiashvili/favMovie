import React, { useState } from "react";
import { styled } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
const SignUpModal = ({ setSignUpModal, setSignInModal }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: userName,
        })
          .then(() => {
            console.log("User display name updated successfully.");
            setSignUpModal(false);
          })
          .catch((error) => {
            console.log("Error updating user display name:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error creating user:", errorCode, errorMessage);
      });
  };

  return (
    <Body>
      <Content>
        <HeaderContainer>
          <Ghost />
          <Title>Registration</Title>
          <CloseButton
            onClick={() => {
              setSignUpModal(false);
            }}
          >
            <CloseIcon sx={{ fontSize: 24, color: "white" }} />
          </CloseButton>
        </HeaderContainer>
        <InputContainer onSubmit={signUp}>
          <Input
            type="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Name"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Terms>
            By creating a personal page, you agree to the
            <Span> terms and conditions</Span> and <Span>privacy policy</Span>.
          </Terms>
          <SignUp type="submit">Sign Up</SignUp>
        </InputContainer>
      </Content>
    </Body>
  );
};
const Body = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 10px;
  min-width: 350px;
  padding: 20px 40px;
  max-width: 25%;
  background-color: rgba(39, 27, 74, 1);
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 16px;
`;
const Title = styled.h1`
  color: white;
  font-size: 20px;
`;
const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
const Ghost = styled.div``;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  background-color: #9747ff33;
  margin: 8px 0px;
  border: none;
  padding: 14px 12px;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
`;

const SignUp = styled.button`
  width: 100%;
  background-color: #442899;
  border: none;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  padding: 14.5px 0px;
  cursor: pointer;
`;
const Terms = styled.h6`
  margin-top: 24px;
  color: white;
  font-size: 10px;
  margin: 24px 13.5px;
`;
const Span = styled.span`
  color: #588ed9;
  font-size: 10px;
`;

export default SignUpModal;
