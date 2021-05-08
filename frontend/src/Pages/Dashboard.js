import React, { useState, useEffect, Fragment, Component } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = ({history}) => {

  const userLogin = useSelector((state) => state.userLogin);
  const { isAuthenticated } = userLogin;

  const redirect = "/login"

  useEffect(()=> {
    if (!isAuthenticated){
      history.push(redirect)
    }
  }, [ history, isAuthenticated, redirect])

  console.log("Dashboard")
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p>Paragraph</p>
      </div>
    </>
  );
};

export default Dashboard;
