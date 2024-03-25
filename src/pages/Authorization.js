import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Facebook from "../assets/Facebook.png";
import Google from "../assets/Google.png";
import CloseIcon from "@mui/icons-material/Close";
import Success from "../assets/success.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { state } from "../valtio/valtio";
import { Link } from "react-router-dom";
import SignUpModal from "../auth/signUpModal";
import { useSnapshot } from "valtio";

const Authorization = () => {
  const [email, setEmail] = useState("zoskagio@gmail.com");
  const [password, setPassword] = useState("zoskagio123");
  const [signUpModal, setSignUpModal] = useState(false);

  const store = useSnapshot(state);
  const signInOption = [
    { title: "Sign in with Facebook", logo: "Facebook" },
    { title: "Sign in with Gmail", logo: "Google" },
  ];

  const signIn = (e) => {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", user);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      store.user = savedUser;
    }
  }, [store]);
  return (
    <Body>
      <Content>
        <HeaderContainer>
          <Ghost />
          <Title>Authorization</Title>
          <CloseButton to={"/"}>
            <CloseIcon sx={{ fontSize: 24, color: "white" }} />
          </CloseButton>
        </HeaderContainer>
        {store.user ? (
          <SuccessContainer>
            <SuccessIcon src={Success} />
            <DisplayName> Welcome {store.user.displayName}</DisplayName>
          </SuccessContainer>
        ) : (
          <>
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
                  setSignUpModal(true);
                }}
              >
                Sign Up
              </SignUp>
              {signUpModal && <SignUpModal setSignUpModal={setSignUpModal} />}
            </NoAccountContainer>
          </>
        )}
      </Content>
    </Body>
  );
};
const Body = styled.div`
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Content = styled.div`
  display: flex;
  padding: 0px 25px;
  background-color: rgba(39, 27, 74, 1);
  width: 30%;
  min-width: 345px;
  margin-top: 62px;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 10px;
  min-height: 625px;
`;
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const SuccessIcon = styled.img`
  width: 80%;
  object-fit: cover;
`;
const DisplayName = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: white;
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
const CloseButton = styled(Link)`
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
  margin-left: 5px;
  color: #cbbdf6;
  text-align: right;
  cursor: pointer;
`;
export default Authorization;
