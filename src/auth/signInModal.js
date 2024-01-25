import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Facebook from "../assets/Facebook.png";
import Google from "../assets/Google.png";
import CloseIcon from "@mui/icons-material/Close";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { state } from "../valtio/valtio";

const SignInModal = ({ setShowModal, setSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInOption = [
    { title: "Sign in with Facebook", logo: "Facebook" },
    { title: "Sign in with Gmail", logo: "Google" },
  ];

  const auth = getAuth();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        setShowModal(false);
        state.currentUser = user;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Body>
      <Content>
        <HeaderContainer>
          <Ghost />
          <Title>Authorization</Title>
          <CloseButton
            onClick={() => {
              setShowModal(false);
            }}
          >
            <CloseIcon sx={{ fontSize: 24, color: "white" }} />
          </CloseButton>
        </HeaderContainer>
        {signInOption.map((option, i) => {
          return (
            <SignInOption key={i}>
              <Logo src={option.logo === "Facebook" ? Facebook : Google} />
              <SignInOptionTitle>{option.title}</SignInOptionTitle>
              <Ghost />
            </SignInOption>
          );
        })}
        <Divider>
          <Line />
          <Or>Or</Or>
          <Line />
        </Divider>
        <InputContainer onSubmit={signIn}>
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
          <Forgot>forgot password?</Forgot>
          <LoginButton>Log in</LoginButton>
        </InputContainer>
        <NoAccountContainer>
          <NoAccount>Don’t have an account?</NoAccount>
          <SignUp
            onClick={() => {
              setSignUp(true);
            }}
          >
            Sign Up
          </SignUp>
        </NoAccountContainer>
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
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;
const Content = styled.div`
  padding: 0px 25px;
  background-color: rgba(39, 27, 74, 1);
  width: 22%;
  min-width: 350px;
  margin-top: 62px;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 10px;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 46px 0px 32px;
`;
const Title = styled.h1`
  color: white;
  font-size: 20px;
`;
const CloseButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
const SignInOption = styled.div`
  border: solid 0.5px #e2e3e880;
  padding: 14.5px 15px;
  border-radius: 10px;
  margin: 5px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const Logo = styled.img`
  width: 24px;
  height: 24px;
`;
const Ghost = styled.div``;
const SignInOptionTitle = styled.h5`
  color: white;
  font-size: 14px;
`;
const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0px 38px;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Or = styled.h6`
  color: rgba(255, 255, 255, 0.5);
  margin: 0px 26px;
  font-size: 12px;
`;
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
const Forgot = styled.h6`
  color: rgba(255, 255, 255, 0.5);
  right: 0px;
  width: 100%;
  text-align: right;
  cursor: pointer;
`;
const LoginButton = styled.button`
  width: 100%;
  background-color: #442899;
  border: none;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  padding: 14.5px 0px;
  margin-top: 24px;
  cursor: pointer;
`;
const NoAccountContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 49px 0px;
`;
const NoAccount = styled.h6`
  color: rgba(255, 255, 255, 0.5);
  text-align: right;
`;
const SignUp = styled.h6`
  color: #cbbdf6;
  text-align: right;
  cursor: pointer;
`;
export default SignInModal;
