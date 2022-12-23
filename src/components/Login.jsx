import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  var token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  function onChangeFunc(event) {
    if (event.target.name === "username") {
      setLoginData({
        username: event.target.value,
        password: loginData.password,
      });
    } else {
      setLoginData({
        username: loginData.username,
        password: event.target.value,
      });
    }
  }

  function HandleLogin(event) {
    axios
      .post("http://localhost:3001/login", loginData)
      .then(function (response) {
        console.log("successfully logged in");
        var token = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      })
      .catch(function (error) {
        console.log("Did you ddddd");
        console.log("login error: ", error);
      });

    event.preventDefault();
  }

  return (
    <div className="loginPage">
      <h1>Login</h1>
      <form onSubmit={HandleLogin}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="userInput"
          onChange={onChangeFunc}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="userInput"
          onChange={onChangeFunc}
        />
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account? </p>
      <Link to="/registration">Sign up</Link>
    </div>
  );
}

export default Login;
