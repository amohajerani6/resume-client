import React from "react"
import Register from "./Register"
import Home from "./Home"
import Login from "./Login"
import DashPage from "./DashPage"
import Page from "./Page"
import CreatePage from "./CreatePage"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/createpage" element={<CreatePage />} />
        <Route path="/dash/:page" element={<DashPage />} />
        <Route path="/:page" element={<Page />} />
      </Routes>
    </>
  )
}

export default App
