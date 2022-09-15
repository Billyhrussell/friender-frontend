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
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getCurrentUser(){
    async function getUser(token){
      if(token){
        FrienderApi.token = token;
        try{
          let user = jwt_decode(token);
          const userData = await FrienderApi.getUserInfo(user.username);
          setCurrentUser(userData);
          setIsLoading(false);
        }catch (err) {
          console.error("ERROR: ", err);
        }
      }else{
        setCurrentUser(null);
        setIsLoading(false);
      }
    }
    getUser(token);
  }, [token])

  function Loading(){

    return(
      <h1 className="loading">Loading...</h1>
    )
  }

  if(isLoading) return (<Loading />);

  async function login(loginData) {
    try {
      let tokenData = await FrienderApi.login(loginData);
      setToken(tokenData);
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

  async function signup({ username, password, name, hobbies,
    interests, zipcode, radius}) {
    try {
      let tokenData = await FrienderApi.signup({username, password, name,
        hobbies, interests, zipcode, radius});
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
            <RoutesList login={login} signup={signup} />
          </div>
        </BrowserRouter>
      </div>
    </userContext.Provider>

  );
}

export default App;
