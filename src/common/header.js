import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

function Header({ page }) {
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
    {
      name: "Animation",
      page: "/Animation",
    },
  ];

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <Container>
      <NavigationContainer>
        {pages.map((navigation, i) => {
          const isselected = currentPage === navigation.page;
          return (
            <Link key={i} to={navigation.page}>
              <Title>{navigation.name}</Title>
            </Link>
          );
        })}
      </NavigationContainer>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30px;
`;

const NavigationContainer = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;

const Title = styled.li`
  color: white;
  &:hover {
    border-bottom: solid 2px #4200ff;
  }
`;

export default Header;
