import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Search from "../components/search/search";
import Logo from "../assets/logo.png";

function Header({ page, setSignInModal }) {
  const [currentPage, setCurrentPage] = useState("Home");
  const pages = [
    {
      name: "Home",
      page: "/",
    },
    {
      name: "Movies",
      page: "/Movies",
    },
    {
      name: "TV Shows",
      page: "/TV Shows",
    },
  ];

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <Container>
      <Link to={"/"}>
        <MainLogo src={Logo} />
      </Link>
      <NavigationContainer>
        {pages.map((navigation, i) => {
          const selected = currentPage === navigation.page;
          return (
            <Link key={i} to={navigation.page}>
              <Title selected={selected}>{navigation.name}</Title>
            </Link>
          );
        })}
        <Search />
      </NavigationContainer>
      <Login
        onClick={() => {
          setSignInModal(true);
        }}
      >
        Log in
      </Login>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;

const NavigationContainer = styled.ul`
  display: flex;
  flex-direction: row;
  width: 50%;
  align-items: center;
  justify-content: space-evenly;
`;
const MainLogo = styled.img`
  object-fit: cover;
  width: 163px;
  height: 24px;
`;

const Title = styled.li`
  font-size: 16px;
  font-weight: 500;
  color: white;
  line-height: 30px;
  border-bottom: ${(props) => (props.selected ? "solid 2px #4200FF" : "none")};
  &:hover {
    border-bottom: solid 2px #4200ff;
    text-decoration: none;
  }
`;
const Login = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  width: 84px;
  height: 44px;
  border: solid 1px #fff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  line-height: 19.5px;
  font-weight: 500;
  color: #fff;
`;

export default Header;
