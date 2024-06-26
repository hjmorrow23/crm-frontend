import { useAppDispatch } from "../hooks";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/user";
import styled, { StyledComponent } from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface HeaderContainerProps {
  loggedIn: boolean;
  children: any[];
}

const HeaderContainer = styled.header<HeaderContainerProps>`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #024;
  padding: 20px;
  color: #fff;
  align-items: center;

  p,
  h1 {
    padding: 0;
    margin: 0;
  }

  h1 {
    position: relative;
    right: ${(props) => (props.loggedIn ? "71px" : "0")};

    @media (max-width: 768px) {
      display: none;
    }
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
  }
`;
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.user);
  const logoutHandler = () => {
    navigate("/", { replace: true });
    dispatch(logout());
  };
  return (
    <HeaderContainer loggedIn={user}>
      {user && <p>Welcome, {user.username}</p>}
      <h1 onClick={() => navigate("/")}>Hank CRM</h1>
      {user && <button onClick={() => logoutHandler()}>Logout</button>}
    </HeaderContainer>
  );
};

export default Header;
