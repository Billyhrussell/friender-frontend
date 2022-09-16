import logo from './logo.svg';

import FrienderApi from './_api';
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import userContext from "./userContext";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import RoutesList from './RoutesList';

const GLOBAL_TOKEN = "token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(GLOBAL_TOKEN) || null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(function getCurrentUser() {
    async function getUser() {
      if (token) {
        FrienderApi.token = token;
        try {
          let user = jwt_decode(token);
          const userData = await FrienderApi.getOneUser(user.username);
          setCurrentUser(userData);
          setIsLoading(false);
        } catch (err) {
          console.error("ERROR: ", err);
        }
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    }
    getUser();
  }, [token]);

  function Loading() {

    return (
      <h1 className="loading">Loading...</h1>
    );
  }

  if (isLoading) return (<Loading />);

  async function login(loginData) {
    try {
      let tokenData = await FrienderApi.login(loginData);
      setToken(tokenData);
      setIsLoading(true);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
    FrienderApi.token = null;
    localStorage.removeItem(GLOBAL_TOKEN);
  }

  async function updateToken(tokenData){
    setToken(tokenData)
  }
  async function signup(data) {
    try {
      let tokenData = await FrienderApi.signup(data);
      setToken(tokenData);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }


  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <BrowserRouter>
          <Navigation logout={logout} />
          <div className="container">
            <RoutesList login={login} updateToken={updateToken} />
          </div>
        </BrowserRouter>
      </div>
    </userContext.Provider>

  );
}

export default App;
