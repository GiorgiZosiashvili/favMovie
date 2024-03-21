import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Search from "../components/search/search";
import Logo from "../assets/logo.png";
import { getAuth, signOut } from "@firebase/auth";
import { useSnapshot } from "valtio";
import { state } from "../valtio/valtio";

function Header({ page }) {
  const [currentPage, setCurrentPage] = useState("Home");
  useSnapshot(state);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    state.user !== null && setLoggedIn(true);
  }, [state.user]);

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
      name: "Favorites",
      page: "/FavoriteMovies",
    },
  ];

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User has been successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <Container>
      <Link to={"/"}>
        <MainLogo src={Logo} />
      </Link>
      <Search />
      <BurgerMenu
        currentPage={currentPage}
        pages={pages}
        handleLogout={handleLogout}
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
      />
    </Container>
  );
}
const BurgerMenu = ({
  currentPage,
  pages,
  handleLogout,
  setLoggedIn,
  loggedIn,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <Menu>
      <BurgerButton onClick={toggleMenu}>
        <BurgerLine />
        <BurgerLine />
        <BurgerLine />
      </BurgerButton>
      <MenuContainer currentPage={currentPage} open={menuOpen}>
        {pages.map((navigation, i) => {
          const selected = currentPage === navigation.page;
          return (
            <MenuLink key={i} to={navigation.page} selected={selected}>
              {navigation.name}
            </MenuLink>
          );
        })}
        {loggedIn ? (
          <>
            {/* <Favorites to={"FavoriteMovies"}>Favorites</Favorites> */}
            <LogOut
              onClick={() => {
                handleLogout();
                setLoggedIn(false);
              }}
            >
              Log Out
            </LogOut>
          </>
        ) : (
          <Login to={"Authorization"}>Log In</Login>
        )}
      </MenuContainer>
    </Menu>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 0px;
`;

const NavigationContainer = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 300px;
  align-items: center;
  background-color: red;
  justify-content: space-evenly;
  @media (max-width: 950px) {
    display: none;
  }
`;
const MainLogo = styled.img`
  object-fit: cover;
  width: 163px;
  height: 24px;
`;
const Login = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border: none;
  background: none;
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  &:hover {
    background-color: #4200ff;
    color: white;
  }
`;
const LogOut = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  &:hover {
    background-color: #4200ff;
    color: white;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 35px;
  width: 35px;
  position: relative;
`;
const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
`;

const BurgerLine = styled.div`
  width: 35px;
  height: 3px;
  background-color: white;
`;

const MenuContainer = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  overflow: hidden;
  top: 40px;
  right: 0;
  width: 150px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  align-items: center;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  &:hover {
    background-color: #4200ff;
    color: white;
  }
  background-color: ${(props) => (props.selected ? "#4200FF" : "none")};
  height: 40px;
  width: 100%;
  color: ${(props) => (props.selected ? "white" : "#333")};
`;

export default Header;
