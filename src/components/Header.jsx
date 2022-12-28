import React, { useState, useEffect } from "react"
import Logout from "./Logout"
import { ReactComponent as Logo } from "../koala.svg"
import "./styles.css"

function Header() {
  return (
    <header>
      <Logo className="logo" />
      <h1>Gagali</h1>
      <Logout />
    </header>
  )
}
export default Header
