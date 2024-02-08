import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Login from "./components/Login";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import styled from 'styled-components';

const AppContainer = styled.div`
  position: relative;
`;


function App() {
  const { user } = useSelector(state => state.user);
  return (
    <AppContainer>
      <Header />
      <Routes>
        {!user && <Route path="/" element={<Login />} />}
        {user && <Route path="/" element={<RecipeList />} />}
        {user && <Route path="/recipe/:id" element={<RecipeDetail />} />}
      </Routes>
    </AppContainer>
  );
}

export default App;
