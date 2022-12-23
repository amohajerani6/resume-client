import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Register() {
  // If already has a token, go to  Home
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    name: "",
    username: "",
    password: "",
  })

  function onChangeFunc(event) {
    if (event.target.name === "username") {
      setLoginData({
        name: loginData.name,
        username: event.target.value,
        password: loginData.password,
      })
    } else if (event.target.name === "name") {
      setLoginData({
        name: event.target.value,
        username: loginData.username,
        password: loginData.password,
      })
    } else {
      setLoginData({
        name: loginData.name,
        username: loginData.username,
        password: event.target.value,
      })
    }
  }

  function handleRegistration(event) {
    axios
      .post(
        "http://ec2-3-212-156-138.compute-1.amazonaws.com:3001/register",
        loginData
      )
      .then(function (response) {
        if (response.data.registered) {
          navigate("/login")
        } else {
          alert("try again")
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    event.preventDefault()
  }

  return (
    <>
      <div className="loginPage">
        <h1>Registration</h1>
        <form onSubmit={handleRegistration}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="userInput"
            onChange={onChangeFunc}
          />
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
        <p>Already have an account? </p>
        <Link to="/login">Sign in</Link>
      </div>
    </>
  )
}

export default Register
