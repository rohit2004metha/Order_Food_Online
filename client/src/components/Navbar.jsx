import React, { useState } from "react";
import styled from "styled-components";
import { Link as LinkR, NavLink } from "react-router-dom";
import LogoImg from "../utils/Images/Logo.png";
import {
  FavoriteBorder,
  MenuRounded,
  SearchRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Button from "./Button";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/UserSlice";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg || "rgba(0, 0, 0, 0.8)"};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;

const Logo = styled.img`
  height: 40px;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;
  position: sticky;
  color: white;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileIcons = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  list-style: none;
  width: 80%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light || "#fff"};
  position: fixed; /* Ensure it's fixed to avoid overlapping issues */
  top: 60px; /* Adjust based on navbar height */
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: 1100; /* Higher z-index to ensure it stays on top */
`;

const TextButton = styled.span`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = ({ setOpenAuth, openAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  
  return (
    <Nav>
      <NavContainer>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>
        <NavLogo to="/">
          <Logo src={LogoImg} />
        </NavLogo>

        <MobileIcons>
          <Navlink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </Navlink>
          <Navlink to="/favorite">
            <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          <Navlink to="/cart">
            <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          {currentUser && (
            <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
          )}
        </MobileIcons>

        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/dishes">Dishes</Navlink>
          <Navlink to="/orders">Orders</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <Navlink to="/" onClick={() => setIsOpen(false)}>
              Home
            </Navlink>
            <Navlink to="/dishes" onClick={() => setIsOpen(false)}>
              Dishes
            </Navlink>
            <Navlink to="/orders" onClick={() => setIsOpen(false)}>
              Orders
            </Navlink>
            <Navlink to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Navlink>
            {currentUser ? (
              <>
                <TextButton onClick={() => dispatch(logout())}>
                  Logout
                </TextButton>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <Button
                  text="Sign Up"
                  outlined
                  small
                  onClick={() => setOpenAuth(true)}
                />
                <Button
                  text="Sign In"
                  small
                  onClick={() => setOpenAuth(true)}
                />
              </div>
            )}
          </MobileMenu>
        )}

        <ButtonContainer>
          <Navlink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </Navlink>
          {currentUser ? (
            <>
              <Navlink to="/favorite">
                <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
              </Navlink>
              <Navlink to="/cart">
                <ShoppingCartOutlined
                  sx={{ color: "inherit", fontSize: "28px" }}
                />
              </Navlink>
              <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
              <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
            </>
          ) : (
            <>
              <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
            </>
          )}
        </ButtonContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
