import { Routes, Route, Navigate } from 'react-router-dom';
import userContext from './userContext';
import React, { useContext } from "react";
import Homepage from './Homepage';


function RoutesList({ login, signup }) {
  const { currentUser } = useContext(userContext);

  return (
    <Routes>
        <Route
        path="/"
        element={<Homepage />}
      />

      {!currentUser &&
        <>
          <Route
            path="/login"
            element={<Login login={login} />}
          />

          <Route
            path="/signup"
            element={<SignUp register={signup} />}
          />
        </>
      }

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default RoutesList;
