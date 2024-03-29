import React from 'react';
import './App.css';
import Header from "./components/Header";
import Login from "./components/Login";
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Leads } from './components/leads/Leads';
import { LeadDetail } from './components/leads/LeadDetail';
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import styled from 'styled-components';

const AppContainer = styled.div`
  position: relative;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: calc(100vh - 42px);
  width: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  width: 90%;
  padding: 50px;
  height: 100%;
  background-color: #f9f9f9;
  overflow-y: scroll;
`;


function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <AppContainer>
      <Header />
      <Body>
        <Sidebar />
        <Content>
          <Routes>
            {!user && <Route path="/" element={<Login />} />}
            {user && <Route path="/" element={<Dashboard />} />}
            {user && <Route path="/leads" element={<Leads />} />}
            {user && <Route path="/leads/:id" element={<LeadDetail />} />}
          </Routes>
        </Content>
      </Body> 
    </AppContainer>
  );
}

export default App;
